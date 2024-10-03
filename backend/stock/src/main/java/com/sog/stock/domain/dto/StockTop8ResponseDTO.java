package com.sog.stock.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StockTop8ResponseDTO {

    private Integer rank;
    private String stockName;
    private String stockCode;

}
