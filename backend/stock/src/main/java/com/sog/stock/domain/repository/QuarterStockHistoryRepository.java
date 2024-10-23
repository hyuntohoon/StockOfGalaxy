package com.sog.stock.domain.repository;

import com.sog.stock.domain.enums.QuarterType;
import com.sog.stock.domain.model.QuarterStockHistory;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface QuarterStockHistoryRepository extends JpaRepository<QuarterStockHistory, Long> {

    // 일(D) 기준 최근 90개의 데이터를 조회 (stockCode와 quarterType = 'D'로 필터링)
    @Query(value = "SELECT * FROM quarter_stock_history WHERE stock_code = :stockCode AND quarter_type = 'D' ORDER BY stock_start_date DESC LIMIT 90", nativeQuery = true)
    List<QuarterStockHistory> findTop90ByStockCodeAndQuarterType(@Param("stockCode") String stockCode);

    // 월(M) 기준 최근 60개의 데이터를 조회 (stockCode와 quarterType = 'M'으로 필터링)
    @Query(value = "SELECT * FROM quarter_stock_history WHERE stock_code = :stockCode AND quarter_type = 'M' ORDER BY stock_start_date DESC LIMIT 60", nativeQuery = true)
    List<QuarterStockHistory> findTop60ByStockCodeAndQuarterType(@Param("stockCode") String stockCode);

    // 년(Y) 기준 모든 데이터를 조회 (stockCode와 quarterType = 'Y'로 필터링)
    @Query(value = "SELECT * FROM quarter_stock_history WHERE stock_code = :stockCode AND quarter_type = 'Y' ORDER BY stock_start_date DESC", nativeQuery = true)
    List<QuarterStockHistory> findByStockCodeAndQuarterType(@Param("stockCode") String stockCode);
}


