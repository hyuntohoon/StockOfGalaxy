package com.sog.stock.presentation.controller;

import com.sog.stock.application.service.StockService;
import com.sog.stock.domain.dto.DailyStockPriceDTO;
import com.sog.stock.domain.dto.FinancialListDTO;
import com.sog.stock.domain.dto.HolidayAddListRequestDTO;
import com.sog.stock.domain.dto.MinuteStockPriceListDTO;
import com.sog.stock.domain.dto.QuarterStockPriceListDTO;
import com.sog.stock.domain.dto.StockAddListRequestDTO;
import com.sog.stock.domain.dto.StockDTO;
import com.sog.stock.domain.dto.DailyStockPriceListDTO;
import com.sog.stock.domain.dto.StockNameResponseDTO;
import com.sog.stock.domain.dto.StockPresentPriceResponseDTO;
import com.sog.stock.domain.dto.StockTop8ListResponseDTO;
import com.sog.stock.domain.enums.QuarterType;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/stock")
public class StockController {

    private final StockService stockService;

    // 주식 일별 시세리스트 조회
    @GetMapping("/{stockCode}/history")
    public DailyStockPriceListDTO getStockHistory(@PathVariable String stockCode) {
        return stockService.getDailyStockHistory(stockCode);
    }

    // 주식 과거 영업일의 정보 조회
    @GetMapping("/{stockCode}/{locDate}")
    public ResponseEntity<DailyStockPriceDTO> getStockPriceHistory(
        @PathVariable String stockCode,
        @PathVariable String locDate) {

        // 서비스에서 주식 정보를 가져옴
        DailyStockPriceDTO dailyStockPriceDTO = stockService.getDailyStockPriceHistory(stockCode,
            locDate);

        // 가져온 데이터를 응답 본문에 포함시켜 반환
        return new ResponseEntity<>(dailyStockPriceDTO, HttpStatus.OK);
    }


    // 주식 일별 시세 등록
    @PostMapping("/history")
    public ResponseEntity<?> addStockHistory(
        @RequestBody DailyStockPriceListDTO stockDailyPriceList) {
        stockService.addDailyStockHistory(stockDailyPriceList);
        return new ResponseEntity<>("등록이 완료되었습니다.", HttpStatus.OK);
    }

    // 주식 분기별 시세 조회
    @GetMapping("/{stockCode}/quarterhistory")
    public ResponseEntity<QuarterStockPriceListDTO> getQuarterStockHistory(
        @PathVariable String stockCode,
        @RequestParam("type") QuarterType type
    ) {
        QuarterStockPriceListDTO stockPriceList = stockService.getQuarterStockHistory(stockCode,
            type);
        return ResponseEntity.ok(stockPriceList);
    }

    // 주식 분기별 시세 등록
    @PostMapping("/quarterhistory")
    public ResponseEntity<?> addQuarterStockHistory(
        @RequestBody QuarterStockPriceListDTO quarterStockPriceList) {
        stockService.addQuarterStockHistory(quarterStockPriceList);
        return new ResponseEntity<>("등록이 완료되었습니다", HttpStatus.OK);
    }

    // 행성 정보 조회
    @GetMapping("/{stockCode}")
    public ResponseEntity<?> getStockInfo(@PathVariable String stockCode) {
        StockDTO stockDTO = stockService.searchStock(stockCode);
        if (stockDTO != null) {
            return new ResponseEntity<>(stockDTO, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Stock not found", HttpStatus.NOT_FOUND);
        }
    }

    // 행성 추가 - list
    @PostMapping("/planets")
    public ResponseEntity<?> addStocks(@RequestBody StockAddListRequestDTO stockAddListRequestDTO) {
        stockService.addStockList(stockAddListRequestDTO);
        return new ResponseEntity<>("Stocks added successfully", HttpStatus.OK);
    }

    // 행성 추가 - 개별
    @PostMapping("/planet")
    public ResponseEntity<?> addStock(@RequestBody StockDTO addStock) {
        stockService.addStock(addStock);
        return new ResponseEntity<>("Stocks added successfully", HttpStatus.OK);
    }

    // 공휴일 추가
    @PostMapping("/holidays")
    public ResponseEntity<?> addHolidays(
        @RequestBody HolidayAddListRequestDTO holidayAddListRequestDTO) {
        // 서비스 레이어로 전달하여 처리
        stockService.addHolidayList(holidayAddListRequestDTO);
        return new ResponseEntity<>("성공적으로 추가 되었습니다.", HttpStatus.OK);
    }

    // 공휴일 확인
    @GetMapping("/holiday/{locDate}")
    public ResponseEntity<?> isHoliday(@PathVariable String locDate) {
        boolean isHoliday = stockService.isHoliday(locDate);
        return new ResponseEntity<>(isHoliday, HttpStatus.OK);
    }

    // 재무재표 등록
    @PostMapping("/financial-statements")
    public ResponseEntity<?> addFinancialStatements(@RequestBody FinancialListDTO financialList) {
        stockService.addFinancialList(financialList);
        return new ResponseEntity<>("제무재표 리스트가 정상적으로 등록되었습니다.", HttpStatus.OK);
    }

    // 제무재표 조회
    @GetMapping("/financial-statements/{stockCode}")
    public ResponseEntity<?> searchFinancialStatements(@PathVariable String stockCode) {
        FinancialListDTO financialListDTO = stockService.searchFinancial(stockCode);
        return new ResponseEntity<>(financialListDTO, HttpStatus.OK);
    }

    // 종목 이름 조회
    @GetMapping("/{stockCode}/name")
    public ResponseEntity<?> getStockName(@PathVariable String stockCode) {
        StockNameResponseDTO stockNameResponseDTO = stockService.searchStockName(stockCode);
        return new ResponseEntity<>(stockNameResponseDTO, HttpStatus.OK);

    }

    // 주식 현재가 조회
    @GetMapping("/{stockCode}/current")
    public ResponseEntity<?> getCurrentStockInfo(@PathVariable String stockCode) {
        StockPresentPriceResponseDTO stockPresentPriceResponse = stockService.searchStockPresentPrice(
            stockCode);
        return new ResponseEntity<>(stockPresentPriceResponse, HttpStatus.OK);

    }

    // 분봉 데이터 조회
    @GetMapping("/{stockCode}/minute-chart/{time}")
    public ResponseEntity<?> getMinuteChart(@PathVariable String stockCode,
        @PathVariable String time) {
        MinuteStockPriceListDTO minuteStockPriceList = stockService.getMinuteStockPriceList(
            stockCode, time);
        return new ResponseEntity<>(minuteStockPriceList, HttpStatus.OK);
    }

    // 날짜별 top 8 종목에 대한 기사수와 순위 조회
    @GetMapping("/top8/{date}")
    public ResponseEntity<?> getTop8(@PathVariable String date) {
        StockTop8ListResponseDTO response = stockService.getTop8StocksWithNews(date).block();
        return ResponseEntity.ok(response);
    }

    // 지정한 날짜 기간 내에 거래량과 기사수를 조회 

}
