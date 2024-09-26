package com.sog.stock.domain.dto;

import java.time.LocalDateTime;
import java.util.Date;
import lombok.Data;

@Data
public class ChartResponseDTO {

    // 날짜, 현재가, 종가, 저가, 고가, 누적거래량, 누적거래대금, 전일대비, 전일대비부호, 전일대비율
    private String stockCode;  //종목코드
    private LocalDateTime dailyStockHistoryDate; // 현재 ->
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
