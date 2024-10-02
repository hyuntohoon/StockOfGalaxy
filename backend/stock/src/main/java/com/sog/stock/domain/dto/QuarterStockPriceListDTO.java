package com.sog.stock.domain.dto;

import java.util.List;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class QuarterStockPriceListDTO {

    private List<QuarterStockPriceDTO> quarterStockPriceList;

}
