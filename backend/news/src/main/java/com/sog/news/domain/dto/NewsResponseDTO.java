package com.sog.news.domain.dto;

import com.sog.news.domain.model.News;
import com.sog.news.global.NewsCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NewsResponseDTO {
    private Long newsId;
    private String title;
    private String content;
    private NewsCategory category;
    private LocalDateTime publishedDate;
    private String newsLink;
    private double sentimentIndex;
    private String thumbnailImg;
    private LocalDateTime newsCreatedAt;
    private LocalDateTime newsUpdatedAt;

    // News 엔티티 -> DTO 변환
    public static NewsResponseDTO fromEntity(News news) {
        return NewsResponseDTO.builder()
                .newsId(news.getNewsId())
                .title(news.getTitle())
                .content(news.getContent())
                .category(news.getCategory())
                .publishedDate(news.getPublishedDate())
                .newsLink(news.getNewsLink())
                .sentimentIndex(news.getSentimentIndex())
                .thumbnailImg(news.getThumbnailImg())
                .newsCreatedAt(news.getNewsCreatedAt())
                .newsUpdatedAt(news.getNewsUpdatedAt())
                .build();
    }
}
