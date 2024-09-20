package com.sog.news.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TodayPlanetNewsResposeDTO {
    private Long id;
    private String title;
    private String content;
    private String writeDate;  // 'write_date'는 자바에서 카멜케이스로 변경
    private String newspaper;  // '신문사'는 영어로 변환
    private String img;
}
