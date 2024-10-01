package com.sog.news.domain.dto;

import com.sog.news.domain.model.News;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NewsPreviewResponseDTO {

    private Long newsId;
    private String title;
    private LocalDateTime publishedDate;
    private String thumbnailImg;

    // News 엔티티를 TodayPlanetNewsResposeDTO로 변환하는 메서드
    public static NewsPreviewResponseDTO fromEntity(News news) {
        return NewsPreviewResponseDTO.builder()
                .newsId(news.getNewsId())
                .title(news.getTitle())
                .publishedDate(news.getPublishedDate())
                .thumbnailImg(news.getThumbnailImg())
                .build();
    }
}
