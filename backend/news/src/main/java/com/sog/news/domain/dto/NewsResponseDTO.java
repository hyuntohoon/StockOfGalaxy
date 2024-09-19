package com.sog.news.domain.dto;

import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NewsResponseDTO {
    private Long id;
    private String title;
    private String content;
    private LocalDateTime writeDate; // timestamp 처리
    private String newspaper;  // 신문사
    private String img;
    private List<String> keywords;
}
