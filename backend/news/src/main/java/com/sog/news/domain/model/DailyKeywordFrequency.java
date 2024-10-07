package com.sog.news.domain.model;

import com.sog.news.domain.dto.DailyKeywordFrequencyResponseDTO;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Map;

@Data
@Builder
@Document(collection = "daily_keyword_frequency")
public class DailyKeywordFrequency {

    @Id
    private String id; // MongoDB에서 사용할 ID
    private Map<String, Integer> keyword; // 키워드와 그 빈도수
    private LocalDateTime dailyKeywordFrequencyCreatedAt; // 생성된 시간
    private LocalDate newsPublishedDate; // 뉴스 게시 날짜

    // DTO에서 엔티티로 변환하는 메서드
    public static DailyKeywordFrequency fromDTO(DailyKeywordFrequencyResponseDTO dto) {
        return DailyKeywordFrequency.builder()
                .keyword(dto.getKeyword())
                .dailyKeywordFrequencyCreatedAt(dto.getDailyKeywordFrequencyCreatedAt())
                .newsPublishedDate(dto.getNewsPublishedDate())
                .build();
    }
}
