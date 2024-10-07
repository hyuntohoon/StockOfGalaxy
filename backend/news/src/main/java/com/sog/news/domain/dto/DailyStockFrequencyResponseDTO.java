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
public class DailyStockFrequencyResponseDTO {
    private String stockName;
    private int count;
    private LocalDate newsPublishedDate;
    private LocalDateTime dailyStockFrequencyCreatedAt;

    @Builder
    public DailyStockFrequencyResponseDTO(String stockName, int count, LocalDateTime dailyStockFrequencyCreatedAt, LocalDate newsPublishedDate) {
        this.stockName = stockName;
        this.count = count;
        this.dailyStockFrequencyCreatedAt = dailyStockFrequencyCreatedAt;
        this.newsPublishedDate = newsPublishedDate;
    }

    // Entity에서 DTO로 변환하는 메서드
    public static DailyStockFrequencyResponseDTO fromEntity(DailyStockFrequency entity) {
        return DailyStockFrequencyResponseDTO.builder()
                .stockName(entity.getStockName())
                .count(entity.getCount())
                .dailyStockFrequencyCreatedAt(entity.getDailyStockFrequencyCreatedAt())
                .newsPublishedDate(entity.getNewsPublishedDate())
                .build();
    }
}
