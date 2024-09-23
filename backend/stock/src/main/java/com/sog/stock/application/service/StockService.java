package com.sog.stock.application.service;

import com.sog.stock.domain.dto.HolidayAddListRequestDTO;
import com.sog.stock.domain.dto.StockAddListRequestDTO;
import com.sog.stock.domain.dto.StockAddRequestDTO;
import com.sog.stock.domain.dto.StockDailyPriceListResponseDTO;
import org.springframework.stereotype.Service;

@Service
public interface StockService {

    // 주식 일별 데이터 조회
    StockDailyPriceListResponseDTO getDailyStockHistory(String stockCode);

    // 주식 개별 추가
    void addStock(StockAddRequestDTO stockAddRequestDTO);

    // 주식 리스트 추가
    void addStockList(StockAddListRequestDTO stockAddListRequestDTO);

    // 공휴일 정보 추가 -> list
    void addHolidayList(HolidayAddListRequestDTO holidayAddListRequestDTO);

    // 공휴일 정보 조회

    //

}
