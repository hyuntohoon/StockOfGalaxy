package com.sog.stock.domain.repository;

import com.sog.stock.domain.model.DailyStockHistory;
import java.util.Date;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DailyStockHistoryRepository extends JpaRepository<DailyStockHistory, Integer> {

    // 종목번호로 검색한 후 날짜 순으로 정렬
    @Query("SELECT d FROM DailyStockHistory d WHERE d.stock.stock_code = :stockCode ORDER BY d.dailyStockHistoryDate DESC")
    List<DailyStockHistory> findByStockCodeOrderByDateDesc(@Param("stockCode") String stockCode);

}
