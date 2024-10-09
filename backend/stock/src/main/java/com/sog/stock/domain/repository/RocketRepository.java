package com.sog.stock.domain.repository;

import com.sog.stock.domain.model.Rocket;
import com.sog.stock.domain.model.Stock;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RocketRepository extends JpaRepository<Rocket, Integer> {

    @Query(value = "SELECT * FROM rocket WHERE stock_code = :stockCode AND is_deleted = false ORDER BY rocket_id DESC", nativeQuery = true)
    List<Rocket> findAllByStockRAndRocketIdDesc(@Param("stockCode") String stockCode);

    // Stock 엔티티에 해당하는 로켓을 PK 내림차순으로 상위 7개만 조회
    @Query(value = "SELECT * FROM rocket WHERE stock_code = :stockCode AND is_deleted = false ORDER BY rocket_id DESC, rocket_id ASC LIMIT 7", nativeQuery = true)
    List<Rocket> findTop7ByStock(@Param("stockCode") String stockCode);

}
