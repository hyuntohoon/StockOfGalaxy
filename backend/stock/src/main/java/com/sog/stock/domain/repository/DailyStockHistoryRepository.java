package com.sog.stock.domain.repository;

import com.sog.stock.domain.model.DailyStockHistory;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DailyStockHistoryRepository extends JpaRepository<DailyStockHistory, Integer> {

    List<DailyStockHistory> findTop90ByStock_StockCodeOrderByDailyStockHistoryDateDesc(String stockCode);

    // 주어진 stockCode와 locDate에 맞는 DailyStockHistory 데이터를 조회
    Optional<DailyStockHistory> findByStock_StockCodeAndDailyStockHistoryDate(String stockCode, String dailyStockHistoryDate);

    @Query("SELECT DISTINCT dsh FROM DailyStockHistory dsh JOIN FETCH dsh.stock WHERE dsh.dailyStockHistoryDate = :date ORDER BY dsh.stockAcmlVol DESC")
    List<DailyStockHistory> findTop3ByVolumeByDate(@Param("date") String date, Pageable pageable);


}
