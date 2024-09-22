package com.sog.stock.application.service;

import com.sog.stock.domain.dto.StockAddRequestDTO;
import com.sog.stock.domain.dto.StockDailyPriceListResponseDTO;
import com.sog.stock.domain.dto.StockDailyPriceResponseDTO;
import com.sog.stock.domain.model.DailyStockHistory;
import com.sog.stock.domain.repository.DailyStockHistoryRepository;
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
    public void addStock(StockAddRequestDTO stockAddRequestDTO) {

    }
}
