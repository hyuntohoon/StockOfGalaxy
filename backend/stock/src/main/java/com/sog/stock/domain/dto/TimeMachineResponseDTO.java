package com.sog.stock.domain.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TimeMachineResponseDTO {

    private String date;
    private Integer articleCount;
    private String totalStockVolume;
    private List<String> top3Stocks;

}
