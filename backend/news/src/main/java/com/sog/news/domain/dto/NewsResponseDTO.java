package com.sog.news.domain.dto;

import com.sog.news.domain.model.News;
import com.sog.news.global.NewsCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NewsResponseDTO {
    private Long newsId;
    private String title;
    private List<String> sentences;
    private NewsCategory category;
    private LocalDateTime publishedDate;
    private String newsLink;
    private double sentimentIndex;
    private String thumbnailImg;
    private LocalDateTime newsCreatedAt;
    private LocalDateTime newsUpdatedAt;
    private List<String> keywords;  // 키워드 리스트 추가

    // News 엔티티 -> DTO 변환
    public static NewsResponseDTO fromEntity(News news, List<String> keywords, List<String> sentences) {
        return NewsResponseDTO.builder()
                .newsId(news.getNewsId())
                .title(news.getTitle())
                .sentences(sentences)
                .category(news.getCategory())
                .publishedDate(news.getPublishedDate())
                .newsLink(news.getNewsLink())
                .sentimentIndex(news.getSentimentIndex())
                .thumbnailImg(news.getThumbnailImg())
                .newsCreatedAt(news.getNewsCreatedAt())
                .newsUpdatedAt(news.getNewsUpdatedAt())
                .keywords(keywords)  // 키워드 리스트 포함
                .build();
    }
}