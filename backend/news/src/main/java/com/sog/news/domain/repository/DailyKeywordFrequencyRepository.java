package com.sog.news.domain.repository;

import com.sog.news.domain.model.DailyKeywordFrequency;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDate;
import java.util.List;

public interface DailyKeywordFrequencyRepository extends MongoRepository<DailyKeywordFrequency, String> {
    // 특정 날짜의 키워드 빈도수 조회
    List<DailyKeywordFrequency> findByNewsPublishedDate(LocalDate newsPublishedDate);
}
