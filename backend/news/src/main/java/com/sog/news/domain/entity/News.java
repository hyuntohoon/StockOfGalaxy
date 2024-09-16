package com.sog.news.domain.entity;

import com.sog.news.global.NewsCategory;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "NEWS")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
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

    @CreationTimestamp
    @Column(name = "news_created_at", nullable = false, updatable = false)
    private LocalDateTime newsCreatedAt;

    @UpdateTimestamp
    @Column(name = "news_updated_at")
    private LocalDateTime newsUpdatedAt;
}