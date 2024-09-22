package com.sog.stock.application.service;

import com.sog.stock.domain.dto.StockDailyPriceListResponseDTO;
import com.sog.stock.domain.dto.StockDailyPriceResponseDTO;
import java.util.Date;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public interface StockService {

    // 주식 일별 데이터 조회
    public StockDailyPriceListResponseDTO getDailyStockHistory(String stockCode);


}
