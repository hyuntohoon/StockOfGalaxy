package com.sog.stock.presentation.controller;

import com.sog.stock.application.service.StockService;
import com.sog.stock.domain.dto.StockDailyPriceListResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/stock")
public class StockController {

    private final StockService stockService;

    // 주식 일별 시세 조회
    @GetMapping("/public/{stockCode}/history")
    public StockDailyPriceListResponseDTO getStockHistory(@PathVariable String stockCode) {
        return stockService.getDailyStockHistory(stockCode);
    }

    // 행성정보조회

    // 행성 정보 추가

    // 공휴일 여부 추가

    // 공휴일 확인


}
