package com.sog.news.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StockNewsCountResponseDTO {
    private String stockName;
    private int count;

    // fromEntity 메서드 추가
    public static StockNewsCountResponseDTO fromEntity(Object[] entity) {
        return new StockNewsCountResponseDTO((String) entity[0], ((Long) entity[1]).intValue());
    }
}
