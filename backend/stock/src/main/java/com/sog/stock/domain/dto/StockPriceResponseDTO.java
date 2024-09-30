package com.sog.stock.domain.dto;

import lombok.Data;

@Data
public class StockPriceResponseDTO {
    // 현재가, 전일대비, 전일대비율, 전일대비부호

    private String stock_code; // 종목번호 - 0
    private String stock_prpr; // 현재가 - 2
    private String prdy_vrss_sign; // 전일 대비 부호 - 3
    private String prdy_vrss; // 전일대비 - 4
    private String prdy_ctrt; // 전일대비율 - 5

}
