package com.sog.stock.domain.dto;

import java.util.List;
import lombok.Data;

@Data
public class StockDailyPriceListResponseDTO {

    private List<StockDailyPriceResponseDTO> stockDailyPriceList;

}
