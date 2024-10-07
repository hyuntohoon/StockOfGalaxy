package com.sog.news.presentation.controller;

import com.sog.news.application.service.NewsService;
import com.sog.news.domain.dto.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
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

    @Autowired
    private NewsService newsService;

    @Operation(summary = "오늘의 소식 조회", description = "오늘 날짜의 모든 뉴스를 조회합니다.")
    @GetMapping("/today/{date}")
    public ResponseEntity<List<TodayNewsResponseDTO>> getTodayNews(@PathVariable LocalDate date) {
        List<TodayNewsResponseDTO> todayNews = newsService.getTodayNews(date);
        return new ResponseEntity<>(todayNews, HttpStatus.OK);
    }

    @Operation(summary = "오늘의 소식 조회(본문 프리뷰 포함)", description = "오늘 날짜의 모든 뉴스를 본문 미리보기를 포함하여 조회합니다.")
    @GetMapping("/today/contain-preview/{date}")
    public ResponseEntity<List<NewsPreviewContainContentResponseDTO>> getTodayNewsContainContent(@PathVariable LocalDate date) {
        List<NewsPreviewContainContentResponseDTO> todayNews = newsService.getTodayNewsWithContent(date);
        return new ResponseEntity<>(todayNews, HttpStatus.OK);
    }

    @Operation(summary = "오늘의 행성 뉴스 조회", description = "오늘 날짜의 행성 관련 뉴스를 조회합니다.")
    @GetMapping("/today/planet/{date}/{stockName}")
    public ResponseEntity<List<TodayPlanetNewsResposeDTO>> getTodayPlanetNews(@PathVariable LocalDate date,
        @PathVariable String stockName) {
        List<TodayPlanetNewsResposeDTO> todayPlanetNews = newsService.getTodayPlanetNews(date, stockName);
        return new ResponseEntity<>(todayPlanetNews, HttpStatus.OK);
    }

    @Operation(summary = "오늘의 행성 뉴스 조회(본문 프리뷰 포함)", description = "오늘 날짜의 행성 관련 뉴스를 본문 미리보기를 포함하여 조회합니다.")
    @GetMapping("/today/planet/contain-preview/{date}/{stockName}")
    public ResponseEntity<List<NewsPreviewContainContentResponseDTO>> getTodayPlanetNewsContainContent(@PathVariable LocalDate date, @PathVariable String stockName) {
        List<NewsPreviewContainContentResponseDTO> todayPlanetNews = newsService.getTodayPlanetNewsWithContent(date, stockName);
        return new ResponseEntity<>(todayPlanetNews, HttpStatus.OK);
    }

    @Operation(summary = "뉴스 제목 키워드 검색", description = "뉴스 제목에서 키워드로 검색합니다.")
    @GetMapping("/search/title")
    public ResponseEntity<List<NewsPreviewResponseDTO>> searchNewsByTitle(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,  // 기본값으로 첫 번째 페이지를 설정
            @RequestParam(defaultValue = "10") int size  // 한 페이지에 10개의 데이터를 보냄
    ) {
        List<NewsPreviewResponseDTO> newsPreviewResponseDTOS = newsService.searchNewsByTitleWithPaging(keyword, page, size);
        return new ResponseEntity<>(newsPreviewResponseDTOS, HttpStatus.OK);
    }

    @Operation(summary = "뉴스 제목 키워드 검색(본문 프리뷰 포함)", description = "뉴스 제목에서 키워드로 본문 미리보기를 포함하여 검색합니다.")
    @GetMapping("/search/title/contain-preview")
    public ResponseEntity<List<NewsPreviewContainContentResponseDTO>> searchNewsByTitleContainContent(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,  // 기본값으로 첫 번째 페이지를 설정
            @RequestParam(defaultValue = "10") int size  // 한 페이지에 10개의 데이터를 보냄
    ) {
        List<NewsPreviewContainContentResponseDTO> newsPreviewResponseDTOS = newsService.searchNewsByTitleWithPagingWithContent(keyword, page, size);
        return new ResponseEntity<>(newsPreviewResponseDTOS, HttpStatus.OK);
    }

    @Operation(summary = "뉴스 내용 키워드 검색", description = "뉴스 내용에서 키워드로 검색합니다.")
    @GetMapping("/search/content")
    public ResponseEntity<List<NewsPreviewResponseDTO>> searchNewsByContent(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,  // 기본값으로 첫 번째 페이지를 설정
            @RequestParam(defaultValue = "10") int size  // 한 페이지에 10개의 데이터를 보냄
    ) {
        List<NewsPreviewResponseDTO> newsPreviewResponseDTOS = newsService.searchNewsByContentWithPaging(keyword, page, size);
        return new ResponseEntity<>(newsPreviewResponseDTOS, HttpStatus.OK);
    }

    @Operation(summary = "뉴스 내용 키워드 검색(본문 프리뷰 포함)", description = "뉴스 내용에서 키워드로 본문 미리보기를 포함하여 검색합니다.")
    @GetMapping("/search/content/contain-preview")
    public ResponseEntity<List<NewsPreviewContainContentResponseDTO>> searchNewsByContentContainContent(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,  // 기본값으로 첫 번째 페이지를 설정
            @RequestParam(defaultValue = "10") int size  // 한 페이지에 10개의 데이터를 보냄
    ) {
        List<NewsPreviewContainContentResponseDTO> newsPreviewResponseDTOS = newsService.searchNewsByContentWithPagingWithContent(keyword, page, size);
        return new ResponseEntity<>(newsPreviewResponseDTOS, HttpStatus.OK);
    }

    @Operation(summary = "뉴스 제목+내용 키워드 검색", description = "뉴스 제목이나 내용에서 키워드로 검색합니다.")
    @GetMapping("/search/title-content")
    public ResponseEntity<List<NewsPreviewResponseDTO>> searchNewsByTitleOrContent(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,  // 기본값으로 첫 번째 페이지를 설정
            @RequestParam(defaultValue = "10") int size  // 한 페이지에 10개의 데이터를 보냄
    ) {
        List<NewsPreviewResponseDTO> newsPreviewResponseDTOS = newsService.searchNewsByTitleOrContentWithPaging(keyword, page, size);
        return new ResponseEntity<>(newsPreviewResponseDTOS, HttpStatus.OK);
    }

    @Operation(summary = "뉴스 제목+내용 키워드 검색(본문 프리뷰 포함)", description = "뉴스 제목이나 내용에서 본문 미리보기를 포함하여 키워드로 검색합니다.")
    @GetMapping("/search/title-content/contain-preview")
    public ResponseEntity<List<NewsPreviewContainContentResponseDTO>> searchNewsByTitleOrContentContainContent(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,  // 기본값으로 첫 번째 페이지를 설정
            @RequestParam(defaultValue = "10") int size  // 한 페이지에 10개의 데이터를 보냄
    ) {
        List<NewsPreviewContainContentResponseDTO> newsPreviewResponseDTOS = newsService.searchNewsByTitleOrContentWithPagingWithContent(keyword, page, size);
        return new ResponseEntity<>(newsPreviewResponseDTOS, HttpStatus.OK);
    }

    @Operation(summary = "날짜 주식별 뉴스 키워드 검색", description = "해당 날짜, 주식별 모든 키워드를 검색합니다.")
    @GetMapping("/keyword-frequency/daily-stock")
    public ResponseEntity<?> getDailyStockKeywordFrequency(@RequestParam LocalDate date, @RequestParam(required = false) String stockCode) {
        return newsService.getDailyStockKeywordFrequency(date, stockCode);
    }

    @Operation(summary = "날짜별 키워드 빈도수 조회", description = "해당 날짜의 모든 뉴스 기사의 키워드 검색합니다.")
    @GetMapping("/keyword-frequency/daily/{date}")
    public ResponseEntity<List<DailyKeywordFrequencyResponseDTO>> getDailyKeywordFrequency(@PathVariable LocalDate date) {
        List<DailyKeywordFrequencyResponseDTO> frequencies = newsService.getDailyKeywordFrequency(date);
        return ResponseEntity.ok(frequencies);
    }

    @Operation(summary = "뉴스 검색", description = "뉴스를 상세 조회합니다.")
    @GetMapping("/{id}")
    public ResponseEntity<NewsResponseDTO> getNewsById(@PathVariable Long id) {
        NewsResponseDTO news = newsService.getNewsById(id);
        return new ResponseEntity<>(news, HttpStatus.OK);
    }

    @Operation(summary = "날짜별 기사 수 조회", description = "시작날짜~종료날짜까지 날짜별로 뉴스 기사 수를 조회합니다.")
    @GetMapping("/count-news/{startDate}/{endDate}")
    public ResponseEntity<List<NewsCountByDateResponseDTO>> getNewsCountByDateRange(@PathVariable LocalDate startDate, @PathVariable LocalDate endDate) {
        List<NewsCountByDateResponseDTO> newsCounts = newsService.getNewsCountByDateRange(startDate, endDate);
        return new ResponseEntity<>(newsCounts, HttpStatus.OK);
    }

    @Operation(summary = "종목별 기사 수 상위 8개 조회", description = "특정 일자에 종목별 뉴스 기사 수 상위 8개를 조회합니다.")
    @GetMapping("/top-stocks/{date}")
    public ResponseEntity<List<DailyStockFrequencyResponseDTO>> getTopNewsStockCountByDate(@PathVariable LocalDate date) {
        List<DailyStockFrequencyResponseDTO> topStockNewsCounts = newsService.getTopNewsStockCountByDate(date);
        return new ResponseEntity<>(topStockNewsCounts, HttpStatus.OK);
    }
}