package com.sog.stock.domain.repository;

import com.sog.stock.domain.model.Rocket;
import com.sog.stock.domain.model.Stock;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RocketRepository extends JpaRepository<Rocket, Integer> {

    // 주어진 Stock 엔티티와 연결된 모든 로켓 조회
    List<Rocket> findByStock(Stock stock);
}
