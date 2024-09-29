package com.sog.news.domain.model;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "NEWS_KEYWORD")
@Getter
@NoArgsConstructor
public class NewsKeyword {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "news_keyword_id")
    private Long newsKeywordId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "news_id", nullable = false) // 외래 키로 News와 연관
    private News news;

    @Column(name = "news_stock_name", nullable = false, length = 16)
    private String newsStockName;

    // 생성자에 @Builder 적용
    @Builder
    public NewsKeyword(News news, String newsStockName) {
        this.news = news;
        this.newsStockName = newsStockName;
    }
}
