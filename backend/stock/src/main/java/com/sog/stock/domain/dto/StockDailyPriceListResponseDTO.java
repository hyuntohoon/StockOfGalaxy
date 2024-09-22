package com.sog.stock.domain.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StockDailyPriceListResponseDTO {

    private List<StockDailyPriceResponseDTO> stockDailyPriceList;

}
