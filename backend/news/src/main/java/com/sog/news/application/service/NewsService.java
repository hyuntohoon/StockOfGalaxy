package com.sog.news.application.service;

import com.sog.news.domain.dto.*;

import java.time.LocalDate;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface NewsService {

    List<TodayNewsResponseDTO> getTodayNews(LocalDate date);

    List<NewsPreviewContainContentResponseDTO> getTodayNewsWithContent(LocalDate date);

    List<TodayPlanetNewsResposeDTO> getTodayPlanetNews(LocalDate date, String stockName);

    List<NewsPreviewContainContentResponseDTO> getTodayPlanetNewsWithContent(LocalDate date, String stockName);

    List<NewsPreviewResponseDTO> searchNewsByTitleWithPaging(String keyword, int page, int size);

    List<NewsPreviewContainContentResponseDTO> searchNewsByTitleWithPagingWithContent(String keyword, int page, int size);

    List<NewsPreviewResponseDTO> searchNewsByContentWithPaging(String keyword, int page, int size);

    List<NewsPreviewContainContentResponseDTO> searchNewsByContentWithPagingWithContent(String keyword, int page, int size);

    List<NewsPreviewResponseDTO> searchNewsByTitleOrContentWithPaging(String keyword, int page, int size);

    List<NewsPreviewContainContentResponseDTO> searchNewsByTitleOrContentWithPagingWithContent(String keyword, int page, int size);

    ResponseEntity<?> getDailyStockKeywordFrequency(LocalDate date, String stockCode);

    List<DailyKeywordFrequencyResponseDTO> getDailyKeywordFrequency(LocalDate startDate);

    NewsResponseDTO getNewsById(Long id);

    List<NewsCountByDateResponseDTO> getNewsCountByDateRange(LocalDate startDate, LocalDate endDate);

    List<DailyStockFrequencyResponseDTO> getTopNewsStockCountByDate(LocalDate date);
}
