package com.sog.news.domain.model;

import com.sog.news.global.NewsCategory;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.List;

@EntityListeners(AuditingEntityListener.class)
@Entity
@Table(name = "NEWS")
@Getter @NoArgsConstructor
@ToString
public class News {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "news_id")
    private Long newsId;

    @Column(name = "title", nullable = false, length = 128) // 변경된 길이
    private String title;

    @Column(name = "content", nullable = false, columnDefinition = "MEDIUMTEXT")
    private String content;

    @Column(name = "thumbnail_img", length = 128) // 변경된 길이
    private String thumbnailImg;

    @Column(name = "published_date", nullable = false)
    private LocalDateTime publishedDate;

    @Column(name = "sentiment_index")
    private Double sentimentIndex;

    @Column(name = "news_link", nullable = false, length = 128) // 변경된 길이
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

    // 일대다 관계 설정: 하나의 News는 여러개의 NewsKeyword를 가질 수 있음
    @OneToMany(mappedBy = "news", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<NewsKeyword> keywords;

    // 생성자에 @Builder 적용
    @Builder
    public News(String title, String content, String thumbnailImg, LocalDateTime publishedDate,
                Double sentimentIndex, String newsLink, NewsCategory category,
                LocalDateTime newsCreatedAt, LocalDateTime newsUpdatedAt, List<NewsKeyword> keywords) {
        this.title = title;
        this.content = content;
        this.thumbnailImg = thumbnailImg;
        this.publishedDate = publishedDate;
        this.sentimentIndex = sentimentIndex;
        this.newsLink = newsLink;
        this.category = category;
        this.newsCreatedAt = newsCreatedAt;
        this.newsUpdatedAt = newsUpdatedAt;
        this.keywords = keywords;
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
