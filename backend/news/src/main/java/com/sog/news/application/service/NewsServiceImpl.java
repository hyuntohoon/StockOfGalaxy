package com.sog.news.application.service;

import com.sog.news.domain.dto.NewsResponseDTO;
import com.sog.news.domain.dto.TodayKeywordCloudResponseDTO;
import com.sog.news.domain.dto.TodayNewsResponseDTO;
import com.sog.news.domain.dto.TodayPlanetNewsResposeDTO;
import com.sog.news.domain.dto.TodayStockCloudResponseDTO;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.sog.news.domain.model.News;
import com.sog.news.domain.repository.NewsRepository;
import com.sog.news.global.exception.exceptions.NewsNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class NewsServiceImpl implements NewsService {

    @Autowired
    private NewsRepository newsRepository;

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
    public ResponseEntity<?> searchNewsContentByKeyword(String keyword) {
        return null;
    }

    @Override
    public ResponseEntity<?> searchNewsTitleByKeyword(String keyword) {
        return null;
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
    public ResponseEntity<?> getDailyKeywordFrequency(LocalDate startDate) {
        // 더미 데이터 생성
        List<TodayKeywordCloudResponseDTO> keywordFrequency = new ArrayList<>();

        // 더미 키워드 데이터 추가
        keywordFrequency.add(TodayKeywordCloudResponseDTO.builder().text("개발").value(6).build());
        keywordFrequency.add(TodayKeywordCloudResponseDTO.builder().text("자바스크립트").value(8).build());
        keywordFrequency.add(TodayKeywordCloudResponseDTO.builder().text("리액트").value(4).build());
        keywordFrequency.add(TodayKeywordCloudResponseDTO.builder().text("프로그래밍").value(5).build());
        keywordFrequency.add(TodayKeywordCloudResponseDTO.builder().text("코딩").value(4).build());
        keywordFrequency.add(TodayKeywordCloudResponseDTO.builder().text("디자인").value(4).build());
        keywordFrequency.add(TodayKeywordCloudResponseDTO.builder().text("배우기").value(4).build());
        keywordFrequency.add(TodayKeywordCloudResponseDTO.builder().text("웹").value(3).build());
        keywordFrequency.add(TodayKeywordCloudResponseDTO.builder().text("앱").value(3).build());
        keywordFrequency.add(TodayKeywordCloudResponseDTO.builder().text("기술").value(3).build());
        keywordFrequency.add(TodayKeywordCloudResponseDTO.builder().text("HTML").value(3).build());
        keywordFrequency.add(TodayKeywordCloudResponseDTO.builder().text("CSS").value(3).build());
        keywordFrequency.add(TodayKeywordCloudResponseDTO.builder().text("알고리즘").value(3).build());
        keywordFrequency.add(TodayKeywordCloudResponseDTO.builder().text("문제해결").value(2).build());
        keywordFrequency.add(TodayKeywordCloudResponseDTO.builder().text("도전").value(2).build());
        keywordFrequency.add(TodayKeywordCloudResponseDTO.builder().text("창의성").value(2).build());
        keywordFrequency.add(TodayKeywordCloudResponseDTO.builder().text("열정").value(2).build());

        // ResponseEntity로 더미 데이터 리스트 반환
        return ResponseEntity.ok(keywordFrequency);
    }

    @Override
    public NewsResponseDTO getNewsById(Long id) {
        return newsRepository.findById(id)
                .map(NewsResponseDTO::fromEntity)  // News 엔티티를 DTO로 변환
                .orElseThrow(() -> new NewsNotFoundException("ID : " + id + " 에 해당하는 뉴스가 존재하지 않습니다."));  // 커스텀 예외 사용
    }
}