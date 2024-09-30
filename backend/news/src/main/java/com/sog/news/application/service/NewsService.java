package com.sog.news.application.service;

import com.sog.news.domain.dto.NewsPreviewResponseDTO;
import com.sog.news.domain.dto.NewsResponseDTO;
import com.sog.news.domain.dto.TodayNewsResponseDTO;
import com.sog.news.domain.dto.TodayPlanetNewsResposeDTO;
import java.time.LocalDate;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface NewsService {

    List<TodayNewsResponseDTO> getTodayNews(LocalDate date);

    List<TodayPlanetNewsResposeDTO> getTodayPlanetNews(LocalDate date, String stockName);

    ResponseEntity<?> searchNewsContentByKeyword(String keyword);

    List<NewsPreviewResponseDTO> searchNewsByTitleWithPaging(String keyword, int page, int size);

    List<NewsPreviewResponseDTO> searchNewsByContentWithPaging(String keyword, int page, int size);

    ResponseEntity<?> getDailyStockKeywordFrequency(LocalDate date, String stockCode);

    ResponseEntity<?> getDailyKeywordFrequency(LocalDate startDate);

    NewsResponseDTO getNewsById(Long id);
}
