package com.sog.news.domain.dto;

import com.sog.news.domain.model.DailyKeywordFrequency;
import com.sog.news.domain.model.DailyStockFrequency;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Map;

@Data
@ToString
@NoArgsConstructor
public class DailyKeywordFrequencyResponseDTO {

    private Map<String, Integer> keyword; // 키워드와 그 빈도를 저장하는 맵
    private LocalDateTime dailyKeywordFrequencyCreatedAt; // 날짜 형식
    private LocalDate newsPublishedDate; // 뉴스 게시 날짜

    @Builder
    public DailyKeywordFrequencyResponseDTO(Map<String, Integer> keyword, LocalDateTime dailyKeywordFrequencyCreatedAt, LocalDate newsPublishedDate) {
        this.keyword = keyword;
        this.dailyKeywordFrequencyCreatedAt = dailyKeywordFrequencyCreatedAt;
        this.newsPublishedDate = newsPublishedDate;
    }

    // Entity에서 DTO로 변환하는 메서드
    public static DailyKeywordFrequencyResponseDTO fromEntity(DailyKeywordFrequency entity) {
        return DailyKeywordFrequencyResponseDTO.builder()
                .keyword(entity.getKeyword())
                .dailyKeywordFrequencyCreatedAt(entity.getDailyKeywordFrequencyCreatedAt())
                .newsPublishedDate(entity.getNewsPublishedDate())
                .build();
    }
}
