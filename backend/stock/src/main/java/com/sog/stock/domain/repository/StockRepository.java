package com.sog.stock.domain.repository;

import com.sog.stock.domain.model.Stock;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface StockRepository extends JpaRepository<Stock, String> {

    // 종목명으로 종목을 검색
    Optional<Stock> findByCorpName(String corpName);

}
