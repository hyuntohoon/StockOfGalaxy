package com.sog.stock.application.service;

import com.sog.stock.domain.dto.HolidayAddListRequestDTO;
import com.sog.stock.domain.dto.HolidayAddRequestDTO;
import com.sog.stock.domain.dto.RocketAddRequestDTO;
import com.sog.stock.domain.dto.RocketResponseDTO;
import com.sog.stock.domain.dto.RocketResponseListDTO;
import com.sog.stock.domain.dto.StockAddListRequestDTO;
import com.sog.stock.domain.dto.StockDTO;
import com.sog.stock.domain.dto.StockDailyPriceListResponseDTO;
import com.sog.stock.domain.dto.StockDailyPriceResponseDTO;
import com.sog.stock.domain.model.DailyStockHistory;
import com.sog.stock.domain.model.Rocket;
import com.sog.stock.domain.model.Stock;
import com.sog.stock.domain.model.StockHoliday;
import com.sog.stock.domain.repository.DailyStockHistoryRepository;
import com.sog.stock.domain.repository.RocketRepository;
import com.sog.stock.domain.repository.StockHolidayRepository;
import com.sog.stock.domain.repository.StockRepository;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StockServiceImpl implements StockService {

    private final DailyStockHistoryRepository dailyStockHistoryRepository;
    private final StockHolidayRepository stockHolidayRepository;
    private final StockRepository stockRepository;
    private final RocketRepository rocketRepository;

    @Override
    public StockDailyPriceListResponseDTO getDailyStockHistory(String stockCode) {

        // 종목번호로 모든 데이터 조회
        List<DailyStockHistory> historyList = dailyStockHistoryRepository.findByStockCodeOrderByDateDesc(
            stockCode);

        // entity 리스트 -> dto리스트 변환
        List<StockDailyPriceResponseDTO> dtoList = historyList.stream()
            .map(StockDailyPriceResponseDTO::fromEntity)
            .collect(Collectors.toList());

        // DTO 리스트를 감싸서 반환
        return new StockDailyPriceListResponseDTO(dtoList);
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
