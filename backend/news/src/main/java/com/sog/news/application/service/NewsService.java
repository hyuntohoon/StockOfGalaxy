package com.sog.news.application.service;

import com.sog.news.domain.dto.TodayNewsResponseDTO;
import com.sog.news.domain.dto.TodayPlanetNewsResposeDTO;
import java.time.LocalDate;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface NewsService {

    ResponseEntity<List<TodayNewsResponseDTO>> getTodayNews(LocalDate date);

    ResponseEntity<List<TodayPlanetNewsResposeDTO>> getTodayPlanetNews(LocalDate date, String stockCode);

    ResponseEntity<?> searchNewsContentByKeyword(String keyword);

    ResponseEntity<?> searchNewsTitleByKeyword(String keyword);

    ResponseEntity<?> getDailyStockKeywordFrequency(LocalDate date, String stockCode);

    ResponseEntity<?> getDailyKeywordFrequency(LocalDate startDate);

    ResponseEntity<?> getNewsById(Long id);
}
