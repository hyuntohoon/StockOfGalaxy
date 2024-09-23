package com.sog.stock.presentation.controller;

import com.sog.stock.application.service.StockService;
import com.sog.stock.domain.dto.HolidayAddListRequestDTO;
import com.sog.stock.domain.dto.StockAddListRequestDTO;
import com.sog.stock.domain.dto.StockDTO;
import com.sog.stock.domain.dto.StockDailyPriceListResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    // 행성 정보 조회
    @GetMapping("/public/{stockCode}")
    public ResponseEntity<?> getStockInfo(@PathVariable String stockCode) {
        StockDTO stockDTO = stockService.searchStock(stockCode);
        if (stockDTO != null) {
            return new ResponseEntity<>(stockDTO, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Stock not found", HttpStatus.NOT_FOUND);
        }
    }

    // 행성 추가 - list
    @PostMapping("/public/planets")
    public ResponseEntity<?> addStocks(@RequestBody StockAddListRequestDTO stockAddListRequestDTO) {
        stockService.addStockList(stockAddListRequestDTO);
        return new ResponseEntity<>("Stocks added successfully", HttpStatus.OK);
    }

    // 행성 추가 - 개별
    @PostMapping("/public/planet")
    public ResponseEntity<?> addStock(@RequestBody StockDTO addStock) {
        stockService.addStock(addStock);
        return new ResponseEntity<>("Stocks added successfully", HttpStatus.OK);
    }

    // 공휴일 추가
    @PostMapping("/public/holidays")
    public ResponseEntity<?> addHolidays(
        @RequestBody HolidayAddListRequestDTO holidayAddListRequestDTO) {
        // 서비스 레이어로 전달하여 처리
        stockService.addHolidayList(holidayAddListRequestDTO);
        return new ResponseEntity<>("성공적으로 추가 되었습니다.", HttpStatus.OK);
    }

    // 공휴일 확인
    @GetMapping("/public/holiday/{locDate}")
    public ResponseEntity<?> isHoliday(@PathVariable String locDate) {
        boolean isHoliday = stockService.isHoliday(locDate);
        return new ResponseEntity<>(isHoliday, HttpStatus.OK);
    }


    /*
    * 로켓 관련 api
    * */

}
