package com.sog.stock.domain.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StockPresentPriceResponseDTO {

    private String stockCode; // 종목번호
    private String stckPrpr; // 현재가
    private String prdyVrss; // 전일대비
    private String prdyVrssSign; // 전일대비 부호
    private String prdyCtrt; // 전일대비율

}
