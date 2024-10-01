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
public class NewsPreviewContainContentResponseDTO {

    private Long newsId;
    private String title;
    private LocalDateTime publishedDate;
    private String thumbnailImg;
    private String content; // 본문 내용의 앞 50자만 담는 필드

    // News 엔티티를 NewsPreviewWithContentResponseDTO로 변환하는 메서드
    public static NewsPreviewContainContentResponseDTO fromEntity(News news) {
        // 본문 내용의 앞 50자 추출 (본문이 50자 미만일 경우 전체 내용을 가져옴)
        String previewContent = news.getContent() != null && news.getContent().length() > 50
                ? news.getContent().substring(0, 50)
                : news.getContent();

        return NewsPreviewContainContentResponseDTO.builder()
                .newsId(news.getNewsId())
                .title(news.getTitle())
                .publishedDate(news.getPublishedDate())
                .thumbnailImg(news.getThumbnailImg())
                .content(previewContent)  // contentPreview에 50자 담기
                .build();
    }
}
