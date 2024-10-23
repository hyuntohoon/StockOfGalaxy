package com.sog.news.domain.repository;

import com.sog.news.domain.model.DailyStockFrequency;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface DailyStockFrequencyRepository extends MongoRepository<DailyStockFrequency, String> {
    // 특정 날짜에 대해 count 기준으로 상위 8개 데이터를 가져오는 쿼리
    @Query(value = "{ 'newsPublishedDate' : ?0 }", sort = "{ 'count' : -1 }")
    List<DailyStockFrequency> findTop8ByNewsPublishedDate(LocalDate date, Pageable pageable);
}
