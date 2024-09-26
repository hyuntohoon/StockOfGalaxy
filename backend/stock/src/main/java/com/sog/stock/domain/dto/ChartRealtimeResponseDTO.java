package com.sog.stock.domain.dto;

import lombok.Data;

@Data
public class ChartRealtimeResponseDTO {

    // 날짜, 현재가, 종가, 저가, 고가, 누적거래량, 누적거래대금, 전일대비, 전일대비부호, 전일대비율
    private String stockCode;
    private String openPrice;
    private String closePrice;
    private String highPrice;
    private String lowPrice;
    private String stockAcmlVol;
    private String stockAcmlTrPbmn;
    private String prdyVrss;
    private String prdyVrssSign;
    private String prdyCtrt;

}
