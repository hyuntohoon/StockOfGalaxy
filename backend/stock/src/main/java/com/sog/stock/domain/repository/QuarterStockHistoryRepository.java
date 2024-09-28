package com.sog.stock.domain.repository;

import com.sog.stock.domain.enums.QuarterType;
import com.sog.stock.domain.model.QuarterStockHistory;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuarterStockHistoryRepository extends JpaRepository<QuarterStockHistory, Long> {

    // 일(D) 기준 최근 90개의 데이터를 조회 (stockCode와 quarterType = 'D'로 필터링)
    List<QuarterStockHistory> findTop90ByStock_StockCodeAndQuarterTypeOrderByStock_EstDtDesc(String stockCode, QuarterType quarterType);

    // 월(M) 기준 최근 60개의 데이터를 조회 (stockCode와 quarterType = 'M'으로 필터링)
    List<QuarterStockHistory> findTop60ByStock_StockCodeAndQuarterTypeOrderByStock_EstDtDesc(String stockCode, QuarterType quarterType);

    // 년(Y) 기준 모든 데이터를 조회 (stockCode와 quarterType = 'Y'로 필터링)
    List<QuarterStockHistory> findByStock_StockCodeAndQuarterType(String stockCode, QuarterType quarterType);
}


