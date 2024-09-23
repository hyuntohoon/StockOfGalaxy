package com.sog.stock.domain.repository;

import com.sog.stock.domain.model.StockHoliday;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockHolidayRepository extends JpaRepository<StockHoliday, Integer> {

}
