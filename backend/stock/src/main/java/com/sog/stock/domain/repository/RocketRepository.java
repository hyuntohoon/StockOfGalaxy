package com.sog.stock.domain.repository;

import com.sog.stock.domain.model.Rocket;
import com.sog.stock.domain.model.Stock;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RocketRepository extends JpaRepository<Rocket, Integer> {

    // 주어진 Stock 엔티티와 연결된 모든 로켓 조회
    List<Rocket> findByStockAndIsDeletedFalseOrderByRocketIdDesc(Stock stock);

    // StockCode에 해당하는 로켓을 PK 내림차순으로 상위 7개 조회
    List<Rocket> findTop7ByStockAndIsDeletedFalseOrderByRocketIdDesc(Stock stock);

}
