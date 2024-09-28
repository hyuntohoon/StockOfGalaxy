package com.sog.stock.domain.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sog.stock.domain.model.DailyStockHistory;
import com.sog.stock.domain.model.Stock;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DailyStockPriceDTO {

    @JsonProperty("daily_stock_history_date")
    private String dailyStockHistoryDate; // 날짜

    @JsonProperty("prdy_ctrt")
    private String prdyCtrt; // 전일 대비율

    @JsonProperty("low_price")
    private Integer lowPrice; // 최저가

    @JsonProperty("high_price")
    private Integer highPrice; // 최고가

    @JsonProperty("open_price")
    private Integer openPrice; // 시작가

    @JsonProperty("close_price")
    private Integer closePrice; // 종가

    @JsonProperty("prdy_vrss")
    private String prdyVrss; // 전일 대비

    @JsonProperty("prdy_vrss_sign")
    private String prdyVrssSign; // 전일 대비 부호

    @JsonProperty("stock_acml_vol")
    private Long stockAcmlVol; // 누적거래량

    @JsonProperty("stock_acml_tr_pbmn")
    private Long stockAcmlTrPbmn; // 누적거래대금

    @JsonProperty("stock_code")
    private String stockCode; // 종목번호


    // entity to dto
    public static DailyStockPriceDTO fromEntity(DailyStockHistory dailyStockHistory) {
        return DailyStockPriceDTO.builder()
            .dailyStockHistoryDate(dailyStockHistory.getDailyStockHistoryDate())
            .lowPrice(dailyStockHistory.getLowPrice())
            .highPrice(dailyStockHistory.getHighPrice())
            .openPrice(dailyStockHistory.getOpenPrice())
            .closePrice(dailyStockHistory.getClosePrice())
            .prdyVrss(dailyStockHistory.getPrdyVrss())
            .prdyVrssSign(dailyStockHistory.getPrdyVrssSign())
            .prdyCtrt(dailyStockHistory.getPrdyCtrt())
            .stockAcmlVol(dailyStockHistory.getStockAcmlVol())
            .stockAcmlTrPbmn(dailyStockHistory.getStockAcmlTrPbmn())
            .stockCode(dailyStockHistory.getStock().getStock_code()) // Stock 객체에서 stockCode 추출
            .build();
    }

    // dto to entity
    public DailyStockHistory toEntity(Stock stock) {
        return new DailyStockHistory(
            null, // id값
            this.dailyStockHistoryDate,
            this.openPrice,
            this.closePrice,
            this.highPrice,
            this.lowPrice,
            this.stockAcmlVol,
            this.stockAcmlTrPbmn,
            this.prdyVrss,
            this.prdyVrssSign,
            this.prdyCtrt,
            stock
        );
    }
}
