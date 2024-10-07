package com.sog.news.domain.model;

import com.sog.news.domain.dto.DailyKeywordFrequencyResponseDTO;
import com.sog.news.domain.dto.DailyStockFrequencyResponseDTO;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@Document(collection = "daily_stock_frequency")
public class DailyStockFrequency {

    @Id
    private String id; // MongoDB에서 사용할 ID
    private String stockName;
    private int count;
    private LocalDate newsPublishedDate;
    private LocalDateTime dailyStockFrequencyCreatedAt;

    // DTO에서 엔티티로 변환하는 메서드
    public static DailyStockFrequency fromDTO(DailyStockFrequencyResponseDTO dto) {
        return DailyStockFrequency.builder()
                .stockName(dto.getStockName())
                .count(dto.getCount())
                .newsPublishedDate(dto.getNewsPublishedDate())
                .dailyStockFrequencyCreatedAt(dto.getDailyStockFrequencyCreatedAt())
                .build();
    }
}
