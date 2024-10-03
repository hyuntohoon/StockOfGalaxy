package com.sog.stock.domain.dto;

import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MinuteStockPriceListDTO {

    private List<MinuteStockPriceDTO> minuteStockPrices;

}
