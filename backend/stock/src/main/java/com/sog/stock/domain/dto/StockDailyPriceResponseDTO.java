package com.sog.stock.domain.dto;

import lombok.Builder;
import lombok.Data;

@Data
public class StockDailyPriceResponseDTO {

    private String stockDate;
    private Integer lowPrice;
    private Integer highPrice;
    private Integer startPrice;
    private Integer endPrice;
    private String prdyVrss; // 전일대비
    private String prdyVrssSign; // 전일 대비 부호
    private String prdyCtrt; // 전일 대비율

}
