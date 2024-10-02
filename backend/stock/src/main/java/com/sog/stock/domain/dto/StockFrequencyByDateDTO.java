package com.sog.stock.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StockFrequencyByDateDTO {

    private Integer articleVolume; // 기사수
    private Integer stockAcmlVol; // 누적 거래량

}
