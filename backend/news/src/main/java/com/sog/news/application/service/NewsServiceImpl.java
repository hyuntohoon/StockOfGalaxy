package com.sog.news.application.service;

import com.sog.news.domain.dto.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.sog.news.domain.model.DailyKeywordFrequency;
import com.sog.news.domain.model.DailyStockFrequency;
import com.sog.news.domain.model.News;
import com.sog.news.domain.model.NewsKeyword;
import com.sog.news.domain.repository.DailyKeywordFrequencyRepository;
import com.sog.news.domain.repository.DailyStockFrequencyRepository;
import com.sog.news.domain.repository.NewsRepository;
import com.sog.news.global.exception.exceptions.NewsNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class NewsServiceImpl implements NewsService {

    @Autowired
    private NewsRepository newsRepository;

    @Autowired
    private DailyStockFrequencyRepository dailyStockFrequencyRepository;

    @Autowired
    private DailyKeywordFrequencyRepository dailyKeywordFrequencyRepository;

    @Override
    public List<TodayNewsResponseDTO> getTodayNews(LocalDate date) {
        // LocalDate를 LocalDateTime으로 변환 (해당 날짜의 시작과 끝)
        LocalDateTime startOfDay = date.atStartOfDay();
        LocalDateTime endOfDay = date.atTime(23, 59, 59);

        // 뉴스 발행일자 기준으로 조회
        List<TodayNewsResponseDTO> newsList = newsRepository.findTodayNews(startOfDay, endOfDay);
        return newsList;
    }

    @Override
    public List<NewsPreviewContainContentResponseDTO> getTodayNewsWithContent(LocalDate date) {
        // LocalDate를 LocalDateTime으로 변환 (해당 날짜의 시작과 끝)
        LocalDateTime startOfDay = date.atStartOfDay();
        LocalDateTime endOfDay = date.atTime(23, 59, 59);

        // 뉴스 발행일자 기준으로 조회
        List<NewsPreviewContainContentResponseDTO> newsList = newsRepository.findTodayNewsWithContent(startOfDay, endOfDay);
        return newsList;
    }

    @Override
    public List<TodayPlanetNewsResposeDTO> getTodayPlanetNews(LocalDate date, String stockName) {
        // LocalDate를 LocalDateTime으로 변환 (해당 날짜의 시작과 끝)
        LocalDateTime startOfDay = date.atStartOfDay();
        LocalDateTime endOfDay = date.atTime(23, 59, 59);

        // 뉴스 발행일자와 주식 이름으로 조회
        List<News> newsList = newsRepository.findByPublishedDateAndStockName(startOfDay, endOfDay, stockName);

        // DTO로 변환 후 반환
        return newsList.stream()
                .map(TodayPlanetNewsResposeDTO::fromEntity)  // fromEntity 메서드를 이용한 변환
                .collect(Collectors.toList());
    }

    @Override
    public List<NewsPreviewContainContentResponseDTO> getTodayPlanetNewsWithContent(LocalDate date, String stockName) {
        // LocalDate를 LocalDateTime으로 변환 (해당 날짜의 시작과 끝)
        LocalDateTime startOfDay = date.atStartOfDay();
        LocalDateTime endOfDay = date.atTime(23, 59, 59);

        // 뉴스 발행일자와 주식 이름으로 조회
        List<News> newsList = newsRepository.findByPublishedDateAndStockName(startOfDay, endOfDay, stockName);

        // DTO로 변환 후 반환
        return newsList.stream()
                .map(NewsPreviewContainContentResponseDTO::fromEntity)  // fromEntity 메서드를 이용한 변환
                .collect(Collectors.toList());
    }

    public List<NewsPreviewResponseDTO> searchNewsByTitleWithPaging(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);  // 페이지와 크기 설정
        return newsRepository.findByTitleContaining(keyword, pageable)
                .map(NewsPreviewResponseDTO::fromEntity)
                .getContent();  // 페이징 정보 제외하고 DTO content만 추출하여 반환
    }

    @Override
    public List<NewsPreviewContainContentResponseDTO> searchNewsByTitleWithPagingWithContent(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);  // 페이지와 크기 설정
        return newsRepository.findByTitleContaining(keyword, pageable)
                .map(NewsPreviewContainContentResponseDTO::fromEntity)
                .getContent();  // 페이징 정보 제외하고 DTO content만 추출하여 반환
    }

    public List<NewsPreviewResponseDTO> searchNewsByContentWithPaging(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);  // 페이지와 크기 설정
        return newsRepository.findByContentContaining(keyword, pageable)
                .map(NewsPreviewResponseDTO::fromEntity)
                .getContent();  // 페이징 정보 제외하고 DTO content만 반환
    }

    @Override
    public List<NewsPreviewContainContentResponseDTO> searchNewsByContentWithPagingWithContent(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);  // 페이지와 크기 설정
        return newsRepository.findByContentContaining(keyword, pageable)
                .map(NewsPreviewContainContentResponseDTO::fromEntity)
                .getContent();  // 페이징 정보 제외하고 DTO content만 반환
    }

    public List<NewsPreviewResponseDTO> searchNewsByTitleOrContentWithPaging(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);  // 페이지와 크기 설정
        return newsRepository.findByTitleContainingOrContentContaining(keyword, keyword, pageable)  // 제목 또는 본문에서 키워드 검색
                .map(NewsPreviewResponseDTO::fromEntity)  // 엔티티를 DTO로 변환
                .getContent();  // 페이징 정보 제외하고 DTO content만 반환
    }

    @Override
    public List<NewsPreviewContainContentResponseDTO> searchNewsByTitleOrContentWithPagingWithContent(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);  // 페이지와 크기 설정
        return newsRepository.findByTitleContainingOrContentContaining(keyword, keyword, pageable)  // 제목 또는 본문에서 키워드 검색
                .map(NewsPreviewContainContentResponseDTO::fromEntity)  // 엔티티를 DTO로 변환
                .getContent();  // 페이징 정보 제외하고 DTO content만 반환
    }


    public ResponseEntity<List<TodayStockCloudResponseDTO>> getDailyStockKeywordFrequency(LocalDate date, String stockCode) {
        // 더미 데이터 생성
        List<TodayStockCloudResponseDTO> stockKeywordFrequency = new ArrayList<>();

        stockKeywordFrequency.add(TodayStockCloudResponseDTO.builder().text("개발").value(6).build());
        stockKeywordFrequency.add(TodayStockCloudResponseDTO.builder().text("자바스크립트").value(8).build());
        stockKeywordFrequency.add(TodayStockCloudResponseDTO.builder().text("리액트").value(4).build());
        stockKeywordFrequency.add(TodayStockCloudResponseDTO.builder().text("프로그래밍").value(5).build());
        stockKeywordFrequency.add(TodayStockCloudResponseDTO.builder().text("코딩").value(4).build());
        stockKeywordFrequency.add(TodayStockCloudResponseDTO.builder().text("디자인").value(4).build());
        stockKeywordFrequency.add(TodayStockCloudResponseDTO.builder().text("배우기").value(4).build());
        stockKeywordFrequency.add(TodayStockCloudResponseDTO.builder().text("웹").value(3).build());
        stockKeywordFrequency.add(TodayStockCloudResponseDTO.builder().text("앱").value(3).build());
        stockKeywordFrequency.add(TodayStockCloudResponseDTO.builder().text("기술").value(3).build());
        stockKeywordFrequency.add(TodayStockCloudResponseDTO.builder().text("HTML").value(3).build());
        stockKeywordFrequency.add(TodayStockCloudResponseDTO.builder().text("CSS").value(3).build());
        stockKeywordFrequency.add(TodayStockCloudResponseDTO.builder().text("알고리즘").value(3).build());
        stockKeywordFrequency.add(TodayStockCloudResponseDTO.builder().text("문제해결").value(2).build());
        stockKeywordFrequency.add(TodayStockCloudResponseDTO.builder().text("도전").value(2).build());
        stockKeywordFrequency.add(TodayStockCloudResponseDTO.builder().text("창의성").value(2).build());
        stockKeywordFrequency.add(TodayStockCloudResponseDTO.builder().text("열정").value(2).build());

        // ResponseEntity로 리스트 반환
        return ResponseEntity.ok(stockKeywordFrequency);
    }

    @Override
    public List<DailyKeywordFrequencyResponseDTO>  getDailyKeywordFrequency(LocalDate date) {
        // 해당 날짜의 키워드 빈도수 조회
        List<DailyKeywordFrequency> frequencies = dailyKeywordFrequencyRepository.findByNewsPublishedDate(date);

        // Entity를 DTO로 변환하여 반환
        return frequencies.stream()
                .map(DailyKeywordFrequencyResponseDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public NewsResponseDTO getNewsById(Long id) {
        News news = newsRepository.findById(id)
                .orElseThrow(() -> new NewsNotFoundException("ID : " + id + "에 해당하는 뉴스가 존재하지 않습니다."));  // 커스텀 예외 사용

        // 해당 뉴스의 키워드 리스트 조회
        List<String> keywords = news.getKeywords().stream()
                .map(NewsKeyword::getNewsStockName)  // NewsKeyword에서 키워드 추출
                .collect(Collectors.toList());

        // DTO로 변환 후 반환
        return NewsResponseDTO.fromEntity(news, keywords);  // News와 키워드를 함께 전달
    }

    @Override
    public List<NewsCountByDateResponseDTO> getNewsCountByDateRange(LocalDate startDate, LocalDate endDate) {
        LocalDateTime startOfDay = startDate.atStartOfDay();
        LocalDateTime endOfDay = endDate.atTime(23, 59, 59);

        // 뉴스 기사 수를 조회, 0번째 index는 날짜, 1번째 index는 기사 수를 담고있음
        List<Object[]> results = newsRepository.findNewsCountByDateBetween(startOfDay, endOfDay);

        // fromEntity 메서드를 사용해 DTO로 변환
        return results.stream()
                .map(NewsCountByDateResponseDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public List<DailyStockFrequencyResponseDTO> getTopNewsStockCountByDate(LocalDate date) {
        Pageable pageable = PageRequest.of(0, 8);

        // MongoDB에서 상위 8개 데이터를 가져오기
        List<DailyStockFrequency> results = dailyStockFrequencyRepository.findTop8ByNewsPublishedDate(date, pageable);

        // Entity를 DTO로 변환
        return results.stream()
                .map(DailyStockFrequencyResponseDTO::fromEntity)
                .collect(Collectors.toList());
    }
}