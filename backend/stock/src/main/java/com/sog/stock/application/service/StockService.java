package com.sog.stock.application.service;

import com.sog.stock.domain.dto.HolidayAddListRequestDTO;
import com.sog.stock.domain.dto.RocketAddRequestDTO;
import com.sog.stock.domain.dto.RocketResponseDTO;
import com.sog.stock.domain.dto.RocketResponseListDTO;
import com.sog.stock.domain.dto.StockAddListRequestDTO;
import com.sog.stock.domain.dto.StockDTO;
import com.sog.stock.domain.dto.StockDailyPriceListResponseDTO;
import org.springframework.stereotype.Service;

@Service
public interface StockService {

    // 주식 일별 데이터 조회
    StockDailyPriceListResponseDTO getDailyStockHistory(String stockCode);

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

    /*
     * 로켓 관련
     * */

    // 로켓 전체 조회 -> 같은 주식에 대한 로켓 목록
//    RocketResponseListDTO getAllRocketsByStockCode(String stockCode);
//
//    // 로켓 상세 조회
//    RocketResponseDTO getRocketById(int rocketId);

    // 로켓 삭제
    boolean deleteRocket(int rocketId, Long memberId);

    // 로켓 작성
    void addRocket(RocketAddRequestDTO rocketAddRequestDTO);

}