package com.sog.news.application.service;

import com.sog.news.domain.dto.NewsResponseDTO;
import com.sog.news.domain.dto.TodayKeywordCloudResponseDTO;
import com.sog.news.domain.dto.TodayNewsResponseDTO;
import com.sog.news.domain.dto.TodayPlanetNewsResposeDTO;
import com.sog.news.domain.dto.TodayStockCloudResponseDTO;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.sog.news.domain.repository.NewsRepository;
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
    public ResponseEntity<List<TodayPlanetNewsResposeDTO>> getTodayPlanetNews(LocalDate date, String stockCode) {
        List<TodayPlanetNewsResposeDTO> newsList = new ArrayList<>();
        newsList.add(TodayPlanetNewsResposeDTO.builder()
                .id(1L)
                .title("React 18 출시")
                .content("React 18이 새로운 기능과 성능 개선과 함께 출시되었습니다.")
                .writeDate("2024-04-20")
                .newspaper("조선일보")
                .img("/images/logo/samsung.png")
                .build());

        newsList.add(TodayPlanetNewsResposeDTO.builder()
                .id(2L)
                .title("Next.js 13 업데이트")
                .content("Next.js 13에서 새로운 라우팅 시스템과 빌드 최적화가 도입되었습니다.")
                .writeDate("2024-04-18")
                .newspaper("동아일보")
                .img("/images/logo/samsung.png")
                .build());

        newsList.add(TodayPlanetNewsResposeDTO.builder()
                .id(3L)
                .title("TypeScript 5.0 발표")
                .content("TypeScript 5.0이 다양한 개선사항과 새로운 기능을 포함하여 발표되었습니다.")
                .writeDate("2024-04-15")
                .newspaper("중앙일보")
                .img("/images/logo/samsung.png")
                .build());

        newsList.add(TodayPlanetNewsResposeDTO.builder()
                .id(4L)
                .title("Emotion Styled 소개")
                .content("Emotion Styled를 활용한 효율적인 스타일링 방법에 대해 알아봅니다.")
                .writeDate("2024-04-10")
                .newspaper("한겨레")
                .img("/images/logo/samsung.png")
                .build());

        newsList.add(TodayPlanetNewsResposeDTO.builder()
                .id(5L)
                .title("프론트엔드 최적화 팁")
                .content("프론트엔드 애플리케이션의 성능을 최적화하기 위한 유용한 팁을 소개합니다.")
                .writeDate("2024-04-05")
                .newspaper("매일경제")
                .img("/images/logo/samsung.png")
                .build());

        return ResponseEntity.ok(newsList);
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

    public ResponseEntity<NewsResponseDTO> getNewsById(Long id) {
        // 더미 데이터 생성 (삼성전자와 애플 관련)
        NewsResponseDTO news = null;
        if (id == 1L) {
            news = NewsResponseDTO.builder()
                    .id(id)
                    .title("삼성전자, 새로운 갤럭시 출시")
                    .content("삼성전자가 새로운 갤럭시 시리즈를 공개하며 모바일 시장에서의 입지를 강화하고 있습니다.")
                    .writeDate(LocalDateTime.of(2024, 4, 20, 10, 0)) // 날짜를 timestamp로 처리
                    .newspaper("조선일보")
                    .img("/images/logo/samsung.png")
                    .keywords(Arrays.asList("삼성전자", "애플"))
                    .build();
        } else if (id == 2L) {
            news = NewsResponseDTO.builder()
                    .id(id)
                    .title("애플, iPhone 16 공개")
                    .content("애플이 iPhone 16을 공개하며 카메라 성능 및 배터리 효율성 등에서 큰 개선을 이루었습니다.")
                    .writeDate(LocalDateTime.of(2024, 5, 15, 12, 0))
                    .newspaper("동아일보")
                    .img("/images/logo/apple.png")
                    .keywords(Arrays.asList("애플", "삼성전자"))
                    .build();
        }

        // ResponseEntity로 반환
        return ResponseEntity.ok(news);
    }
}
