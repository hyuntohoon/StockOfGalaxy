package com.sog.stock.application.service;

import com.sog.stock.domain.dto.FinancialDTO;
import com.sog.stock.domain.dto.FinancialListDTO;
import com.sog.stock.domain.dto.HolidayAddListRequestDTO;
import com.sog.stock.domain.dto.HolidayAddRequestDTO;
import com.sog.stock.domain.dto.rocket.RocketAddRequestDTO;
import com.sog.stock.domain.dto.StockAddListRequestDTO;
import com.sog.stock.domain.dto.StockDTO;
import com.sog.stock.domain.dto.StockDailyPriceListDTO;
import com.sog.stock.domain.dto.StockDailyPriceDTO;
import com.sog.stock.domain.dto.StockNameResponseDTO;
import com.sog.stock.domain.model.DailyStockHistory;
import com.sog.stock.domain.model.FinancialStatements;
import com.sog.stock.domain.model.Rocket;
import com.sog.stock.domain.model.Stock;
import com.sog.stock.domain.model.StockHoliday;
import com.sog.stock.domain.repository.DailyStockHistoryRepository;
import com.sog.stock.domain.repository.FinancialStatementsRepository;
import com.sog.stock.domain.repository.RocketRepository;
import com.sog.stock.domain.repository.StockHolidayRepository;
import com.sog.stock.domain.repository.StockRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StockServiceImpl implements StockService {

    private final DailyStockHistoryRepository dailyStockHistoryRepository;
    private final StockHolidayRepository stockHolidayRepository;
    private final StockRepository stockRepository;
    private final RocketRepository rocketRepository;
    private final FinancialStatementsRepository financialStatementsRepository;

    @Override
    public StockDailyPriceListDTO getDailyStockHistory(String stockCode) {

        // 종목번호로 모든 데이터 조회
        List<DailyStockHistory> historyList = dailyStockHistoryRepository.findByStockCodeOrderByDateDesc(
            stockCode);

        // entity 리스트 -> dto리스트 변환
        List<StockDailyPriceDTO> dtoList = historyList.stream()
            .map(StockDailyPriceDTO::fromEntity)
            .collect(Collectors.toList());

        // DTO 리스트를 감싸서 반환
        return new StockDailyPriceListDTO(dtoList);
    }

    @Override
    public void addStockList(StockAddListRequestDTO stockAddListRequestDTO
    ) {
        // 각 stockDTO를 stock entity로 변환후 저장
        for (StockDTO addStock : stockAddListRequestDTO.getStocks()) {
            Stock stock = Stock.fromDTO(addStock);
            stockRepository.save(stock);
        }
    }

    @Override
    public void addStock(StockDTO stockAddRequest) {
        Stock stock = Stock.fromDTO(stockAddRequest);
        stockRepository.save(stock);
    }

    @Override
    public StockDTO searchStock(String stockCode) {
        Stock stock = stockRepository.findById(stockCode)
            .orElseThrow(() -> new RuntimeException("행성을 찾을 수 없습니다."));

        return stock.toDTO();
    }

    @Override
    public void addHolidayList(HolidayAddListRequestDTO holidayAddListRequestDTO) {
        // 각 holiday DTO를 StockHoliday 엔티티로 변환 후 저장
        for (HolidayAddRequestDTO holidayAddRequestDTO : holidayAddListRequestDTO.getHolidays()) {
            StockHoliday stockHoliday = StockHoliday.fromDTO(holidayAddRequestDTO);
            stockHolidayRepository.save(stockHoliday);
        }
    }

    @Override
    public boolean isHoliday(String holidayDate) {
        return stockHolidayRepository.existsByLocDate(holidayDate);
    }

    @Override
    public void addFinancialList(FinancialListDTO financialList) {
        // 각 financial dto를 entity로 변환 후 저장
        for (FinancialDTO financialDTO : financialList.getFinancialList()) {
            // stockCode가 null인지 확인
            System.out.println(financialDTO);
            if (financialDTO.getStock_code() == null || financialDTO.getStock_code().isEmpty()) {
                throw new IllegalArgumentException("종목 코드가 null이거나 비어있습니다.");
            }
            // Stock 조회
            Stock stock = stockRepository.findById(financialDTO.getStock_code())
                .orElseThrow(() -> new IllegalArgumentException(
                    "해당 종목 코드가 존재하지 않습니다: " + financialDTO.getStock_code()));

            // DTO TO ENTITY
            FinancialStatements financialStatements = FinancialStatements.builder()
                .stacyymm(financialDTO.getStac_yymm())
                .totalLiabilities(financialDTO.getTotal_liabilities())
                .totalEquity(financialDTO.getTotal_equity())
                .currentAssets(financialDTO.getCurrent_assets())
                .currentLiabilities(financialDTO.getCurrent_liabilities())
                .stock(stock)
                .build();

            financialStatementsRepository.save(financialStatements);
        }

    }

    @Override
    public FinancialListDTO searchFinancial(String stockCode) {
        // 종목번호별로 제무재표 list 조회
        // stockCode로 Stock 객체 조회
        Stock stock = stockRepository.findById(stockCode)
            .orElseThrow(() -> new IllegalArgumentException("해당 종목 코드가 존재하지 않습니다: " + stockCode));

        // Stock에 해당하는 FinancialStatements 리스트 조회
        List<FinancialStatements> financialStatementsList = financialStatementsRepository.findByStock(stock);

        // FinancialDTO 리스트로 변환
        List<FinancialDTO> financialDTOList = financialStatementsList.stream()
            .map(fs -> new FinancialDTO(
                fs.getStock().getStock_code(),
                fs.getStacyymm(),
                fs.getCurrentAssets(),
                fs.getCurrentLiabilities(),
                fs.getTotalLiabilities(),
                fs.getTotalEquity()
            ))
            .collect(Collectors.toList());

        // FinancialListDTO에 담아서 반환
        return new FinancialListDTO(financialDTOList);
    }

    @Override
    public StockNameResponseDTO searchStockName(String stockCode) {
        // stockCode로 db에서 검색하여 Stock 객체를 반환
        Stock stock = stockRepository.findById(stockCode)
            .orElseThrow(() -> new IllegalArgumentException("해당 종목 코드가 존재하지 않습니다: " + stockCode));

        // StockNameResponseDTO로 변환하여 반환
        return new StockNameResponseDTO(stock.getCorp_name());
    }


    // 로켓 전체 조회 -> 같은 주식 코드로 연결된 로켓 리스트
//    @Override
//    public RocketResponseListDTO getAllRocketsByStockCode(String stockCode) {
//        Stock stock = stockRepository.findById(stockCode)
//            .orElseThrow(() -> new RuntimeException("Stock not found"));
//
//        // rocket에 memberId로 user서버에 사용자 정보 조회해와서 표시.
//        List<RocketResponseDTO> rocketList = rocketRepository.findByStock(stock).stream()
//            .map(rocket -> {
//                return RocketResponseDTO.builder()
//                    .nickname(rocket.getNickname())
//                    .characterType(rocket.getCharacterType())
//                    .createdAt(rocket.getRocketCreatedAt())
//                    .message(rocket.getContent())
//                    .price(rocket.getStockPrice())
//                    .build();
//            })
//            .collect(Collectors.toList());
//
//        return new RocketResponseListDTO(rocketList);
//    }
//
//    // 로켓 개별 조회
//    @Override
//    public RocketResponseDTO getRocketById(int rocketId) {
//        return rocketRepository.findById(rocketId)
//            .map(rocket -> RocketResponseDTO.builder()
//                .nickname(rocket.getNickname())
//                .characterType(rocket.getCharacterType())
//                .createdAt(rocket.getRocketCreatedAt())
//                .message(rocket.getContent())
//                .price(rocket.getStockPrice())
//                .build())
//            .orElseThrow(() -> new RuntimeException("Rocket not found"));
//    }
//
    @Override
    public boolean deleteRocket(int rocketId, Long memberId) {
        // 로켓 조회 후 memberId 확인
        return rocketRepository.findById(rocketId)
            .filter(rocket -> rocket.getMemberId().equals(memberId))  // memberId가 일치하는지 확인
            .map(rocket -> {
                rocket.markAsDeleted();  // 소프트 삭제 (isDeleted 플래그 변경)
                rocketRepository.save(rocket);  // 변경사항 저장
                return true;
            })
            .orElse(false);  // 로켓이 없거나 memberId가 일치하지 않으면 false 반환
    }


    @Override
    public void addRocket(RocketAddRequestDTO rocketAddRequestDTO) {
        // 주식 정보 조회
        Stock stock = stockRepository.findById(rocketAddRequestDTO.getStockCode())
            .orElseThrow(() -> new RuntimeException("해당 종목을 찾을 수 없습니다."));

        // Stock 엔티티와 DTO
        Rocket rocket = Rocket.builder()
            .memberId(rocketAddRequestDTO.getMemberId())
            .content(rocketAddRequestDTO.getMessage())
            .stockPrice(rocketAddRequestDTO.getPrice())
            .rocketCreatedAt(LocalDateTime.now())
            .isDeleted(false)
            .stock(stock)  // 조회한 Stock 엔티티 설정
            .build();

        // 엔티티 저장
        rocketRepository.save(rocket);
    }
}
