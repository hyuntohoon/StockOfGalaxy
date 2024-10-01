package com.sog.stock.application.service;

import com.sog.stock.domain.dto.FinancialListDTO;
import com.sog.stock.domain.dto.HolidayAddListRequestDTO;
import com.sog.stock.domain.dto.MinuteStockPriceListDTO;
import com.sog.stock.domain.dto.QuarterStockPriceDTO;
import com.sog.stock.domain.dto.QuarterStockPriceListDTO;
import com.sog.stock.domain.dto.StockPresentPriceResponseDTO;
import com.sog.stock.domain.dto.rocket.RocketAddRequestDTO;
import com.sog.stock.domain.dto.StockAddListRequestDTO;
import com.sog.stock.domain.dto.StockDTO;
import com.sog.stock.domain.dto.DailyStockPriceListDTO;
import com.sog.stock.domain.dto.StockNameResponseDTO;
import com.sog.stock.domain.dto.rocket.RocketResponseDTO;
import com.sog.stock.domain.dto.rocket.RocketResponseListDTO;
import com.sog.stock.domain.enums.QuarterType;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public interface StockService {

    // 주식 일별 데이터 조회
    DailyStockPriceListDTO getDailyStockHistory(String stockCode);

    // 주식 일별 데이터 추가
    void addDailyStockHistory(DailyStockPriceListDTO stockDailyPriceList);

    // 주식 분기별 데이터 조회
    QuarterStockPriceListDTO getQuarterStockHistory(String stockCode, QuarterType quarterType);

    // 주식 분기별 데이터 추가
    void addQuarterStockHistory(QuarterStockPriceListDTO quarterStockPriceList);

    // 행성 리스트 추가
    void addStockList(StockAddListRequestDTO stockAddListRequestDTO);

    // 행성 개별 추가
    void addStock(StockDTO stockAddRequest);

    // 행성 조회
    StockDTO searchStock(String stockCode);

    // 공휴일 정보 추가 -> list
    void addHolidayList(HolidayAddListRequestDTO holidayAddListRequestDTO);

    // 공휴일 정보 조회
    boolean isHoliday(String holidayDate);

    // 제무재표 등록
    void addFinancialList(FinancialListDTO financialList);

    // 제무재표 조회
    FinancialListDTO searchFinancial(String stockCode);

    // 종목이름 조회
    StockNameResponseDTO searchStockName(String stockCode);

    // 주식 현재가 조회
    StockPresentPriceResponseDTO searchStockPresentPrice(String stockCode);

    // 시간에 따른 분봉 차트 데이터를 조회
    MinuteStockPriceListDTO getMinuteStockPriceList(String stockCode, String time);
    /*
     * 로켓 관련
     * */

    // 로켓 전체 조회 -> 같은 주식에 대한 로켓 목록
    public Mono<RocketResponseListDTO> getAllRocketsByStockCode(String stockCode);

    // 로켓 상세 조회
//    RocketResponseDTO getRocketById(int rocketId);

    // 로켓 삭제
    boolean deleteRocket(int rocketId, Long memberId);

    // 로켓 작성
    void addRocket(RocketAddRequestDTO rocketAddRequestDTO);

}
