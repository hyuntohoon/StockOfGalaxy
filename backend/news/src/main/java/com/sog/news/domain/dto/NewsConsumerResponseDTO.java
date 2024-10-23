package com.sog.news.domain.dto;

import com.sog.news.domain.model.News;
import com.sog.news.global.NewsCategory;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
public class NewsConsumerResponseDTO {
    private String title;
    private String content;
    private String thumbnailImg;
    private LocalDateTime publishedDate;
    private Double sentimentIndex;
    private String newsLink;
    private NewsCategory category;
    private List<String> keywords; // 키워드 배열

    @Builder
    public NewsConsumerResponseDTO(String title, String content, String thumbnailImg, LocalDateTime publishedDate,
                   Double sentimentIndex, String newsLink, NewsCategory category, List<String> keywords) {
        this.title = title;
        this.content = content;
        this.thumbnailImg = thumbnailImg;
        this.publishedDate = publishedDate;
        this.sentimentIndex = sentimentIndex;
        this.newsLink = newsLink;
        this.category = category;
        this.keywords = keywords;
    }

    public News toEntity() {
        return News.builder()
                .title(this.title)
                .content(this.content)
                .thumbnailImg(this.thumbnailImg)
                .publishedDate(this.publishedDate)
                .sentimentIndex(this.sentimentIndex)
                .newsLink(this.newsLink)
                .category(this.category)
                .build();
    }
}
