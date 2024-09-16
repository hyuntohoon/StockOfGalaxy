package com.sog.news.presentation.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PathVariable;

import java.time.LocalDate;

@Controller
@RequestMapping("/api/news")
@Tag(name = "News", description = "뉴스 관련 API")
public class NewsController {

    @Operation(summary = "오늘의 소식 조회", description = "오늘 날짜의 모든 뉴스를 조회합니다.")
    @GetMapping("/today")
    public ResponseEntity<?> getTodayNews() {
        return newsService.getTodayNews();
    }

    @Operation(summary = "오늘의 행성 뉴스 조회", description = "오늘 날짜의 행성 관련 뉴스를 조회합니다.")
    @GetMapping("/today/planet")
    public ResponseEntity<?> getTodayPlanetNews() {
        return newsService.getTodayPlanetNews();
    }

    @Operation(summary = "뉴스 제목 키워드 검색", description = "뉴스 제목에서 키워드로 검색합니다.")
    @GetMapping("/search")
    public ResponseEntity<?> searchNewsByKeyword(@RequestParam String keyword, @RequestParam(required = false) boolean searchContent) {
        return searchContent ? newsService.searchNewsContentByKeyword(keyword) : newsService.searchNewsTitleByKeyword(keyword);
    }

    @Operation(summary = "날짜 주식별 뉴스 키워드 검색", description = "해당 날짜, 주식별 모든 키워드를 검색합니다.")
    @GetMapping("/keyword-frequency")
    public ResponseEntity<?> getKeywordFrequency(@RequestParam LocalDate date, @RequestParam(required = false) String stockCode) {
        return newsService.getKeywordFrequency(date, stockCode);
    }

    @Operation(summary = "날짜별 키워드 빈도수 조회", description = "해당 날짜의 모든 뉴스 기사의 키워드 검색합니다.")
    @GetMapping("/keyword-frequency/daily")
    public ResponseEntity<?> getDailyKeywordFrequency(@RequestParam LocalDate startDate, @RequestParam LocalDate endDate) {
        return newsService.getDailyKeywordFrequency(startDate, endDate);
    }

    @Operation(summary = "뉴스 검색", description = "뉴스를 상세 조회합니다.")
    @GetMapping("/{id}")
    public ResponseEntity<?> getNewsById(@PathVariable Long id) {
        return newsService.getNewsById(id);
    }
}
