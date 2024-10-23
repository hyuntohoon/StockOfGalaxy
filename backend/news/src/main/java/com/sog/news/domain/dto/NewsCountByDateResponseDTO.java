package com.sog.news.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NewsCountByDateResponseDTO {
    private LocalDate date;
    private int count;

    public static NewsCountByDateResponseDTO fromEntity(Object[] entity) {
        return NewsCountByDateResponseDTO.builder()
                .date(((java.sql.Date) entity[0]).toLocalDate()) // java.sql.Date -> LocalDate 변환
                .count(((Long) entity[1]).intValue()) // 기사 수 변환
                .build();
    }
}

