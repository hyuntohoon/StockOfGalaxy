package com.sog.news.domain.dto;

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
public class TodayNewsResponseDTO {
    private Long newsId;
    private String title;
    private LocalDateTime publishedDate;
    private String thumbnailImg;
}