package com.sog.stock.application.service;

import com.sog.stock.domain.dto.HolidayAddListRequestDTO;
import com.sog.stock.domain.dto.HolidayAddRequestDTO;
import com.sog.stock.domain.dto.StockAddListRequestDTO;
import com.sog.stock.domain.dto.StockDTO;
import com.sog.stock.domain.dto.StockDailyPriceListResponseDTO;
import com.sog.stock.domain.dto.StockDailyPriceResponseDTO;
import com.sog.stock.domain.model.DailyStockHistory;
import com.sog.stock.domain.model.Stock;
import com.sog.stock.domain.model.StockHoliday;
import com.sog.stock.domain.repository.DailyStockHistoryRepository;
import com.sog.stock.domain.repository.StockHolidayRepository;
import com.sog.stock.domain.repository.StockRepository;
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
}
