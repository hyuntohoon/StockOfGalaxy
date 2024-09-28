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

    List<DailyStockHistory> findByStock_StockCodeOrderByDailyStockHistoryDateDesc(String stockCode);

}
