package com.sog.stock.domain.repository;

import com.sog.stock.domain.model.QuarterStockHistory;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuarterStockHistoryRepository extends JpaRepository<QuarterStockHistory, Integer> {

    // 일(D) 기준 최근 90개의 데이터를 조회
    List<QuarterStockHistory> findTop90ByStockCodeOrderByStockStartDateDesc(String stockCode);

    // 월(M) 기준 최근 60개의 데이터를 조회
    List<QuarterStockHistory> findTop60ByStockCodeOrderByStockStartDateDesc(String stockCode);

    // 년(Y) 기준 모든 데이터를 조회
    List<QuarterStockHistory> findByStockCodeAndQuarterType(String stockCode);

}
