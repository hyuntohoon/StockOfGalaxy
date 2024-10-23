package com.sog.stock.domain.repository;

import com.sog.stock.domain.model.StockHoliday;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface StockHolidayRepository extends JpaRepository<StockHoliday, Integer> {

    // locDate 필드로 공휴일 존재 여부를 확인하는 메서드
    boolean existsByLocDate(String locDate);

    // locDate로 공휴일 이름을 조회
    @Query("SELECT sh FROM StockHoliday sh WHERE sh.locDate = :locDate")
    List<StockHoliday> findByLocDate(String locDate, Pageable pageable);

}
