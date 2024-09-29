package com.sog.news.domain.model;

import com.sog.news.global.NewsCategory;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@EntityListeners(AuditingEntityListener.class)
@Entity
@Table(name = "NEWS")
@Getter @NoArgsConstructor
public class News {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "news_id")
    private Long newsId;

    @Column(name = "title", nullable = false, length = 32)
    private String title;

    @Column(name = "content", nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(name = "thumbnail_img", length = 64)
    private String thumbnailImg;

    @Column(name = "published_date", nullable = false)
    private LocalDateTime publishedDate;

    @Column(name = "sentiment_index")
    private Double sentimentIndex;

    @Column(name = "news_link", nullable = false, length = 64)
    private String newsLink;

    @Enumerated(EnumType.STRING)
    @Column(name = "category", nullable = false, columnDefinition = "CHAR(10)")
    private NewsCategory category;

    @CreatedDate
    @Column(name = "news_created_at", nullable = false, updatable = false)
    private LocalDateTime newsCreatedAt;

    @LastModifiedDate
    @Column(name = "news_updated_at")
    private LocalDateTime newsUpdatedAt;

    // 생성자에 @Builder 적용
    @Builder
    public News(String title, String content, String thumbnailImg, LocalDateTime publishedDate,
                Double sentimentIndex, String newsLink, NewsCategory category,
                LocalDateTime newsCreatedAt, LocalDateTime newsUpdatedAt) {
        this.title = title;
        this.content = content;
        this.thumbnailImg = thumbnailImg;
        this.publishedDate = publishedDate;
        this.sentimentIndex = sentimentIndex;
        this.newsLink = newsLink;
        this.category = category;
        this.newsCreatedAt = newsCreatedAt;
        this.newsUpdatedAt = newsUpdatedAt;
    }

    @PrePersist
    @PreUpdate
    private void trimNanoSeconds() {
        if (newsCreatedAt != null) {
            newsCreatedAt = newsCreatedAt.withNano(0);
        }
        if (newsUpdatedAt != null) {
            newsUpdatedAt = newsUpdatedAt.withNano(0);
        }
    }
}