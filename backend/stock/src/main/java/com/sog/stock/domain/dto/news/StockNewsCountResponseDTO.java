package com.sog.stock.domain.dto.news;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StockNewsCountResponseDTO {

    private String stockName; // 주식명
    private Integer count; // 기사수
}
