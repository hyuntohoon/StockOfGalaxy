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

    @JsonProperty("open_price")
    private String openPrice; // 시작가

    @JsonProperty("close_price")
    private String closePrice; // 종가

    @JsonProperty("low_price")
    private String lowPrice; // 최저가

    @JsonProperty("high_price")
    private String highPrice; // 최고가

    @JsonProperty("stock_acml_vol")
    private String stockAcmlVol; // 누적거래량

    @JsonProperty("stock_acml_tr_pbmn")
    private String stockAcmlTrPbmn; // 누적거래대금

    @JsonProperty("prdy_vrss")
    private String prdyVrss; // 전일 대비

    @JsonProperty("prdy_vrss_sign")
    private String prdyVrssSign; // 전일 대비 부호

    @JsonProperty("prdy_ctrt")
    private String prdyCtrt; // 전일 대비율

    @JsonProperty("year_high_price")
    private String yearHighPrice; // 1년 최고

    @JsonProperty("year_low_price")
    private String yearLowPrice; // 1년 최저

    @JsonProperty("market_capitalization")
    private String marketCapitalization; // 시가총액

    @JsonProperty("stock_code")
    private String stockCode; // 종목번호

    // entity to dto
    public static DailyStockPriceDTO fromEntity(DailyStockHistory dailyStockHistory) {
        return DailyStockPriceDTO.builder()
            .dailyStockHistoryDate(dailyStockHistory.getDailyStockHistoryDate())
            .openPrice(dailyStockHistory.getOpenPrice())
            .closePrice(dailyStockHistory.getClosePrice())
            .lowPrice(dailyStockHistory.getLowPrice())
            .highPrice(dailyStockHistory.getHighPrice())
            .stockAcmlVol(dailyStockHistory.getStockAcmlVol())
            .stockAcmlTrPbmn(dailyStockHistory.getStockAcmlTrPbmn())
            .prdyVrss(dailyStockHistory.getPrdyVrss())
            .prdyVrssSign(dailyStockHistory.getPrdyVrssSign())
            .prdyCtrt(dailyStockHistory.getPrdyCtrt())
            .yearHighPrice(dailyStockHistory.getYearHighPrice())
            .yearLowPrice(dailyStockHistory.getYearLowPrice())
            .marketCapitalization(dailyStockHistory.getMarketCapitalization())
            .stockCode(dailyStockHistory.getStock().getStockCode()) // Stock 객체에서 stockCode 추출
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
            this.yearHighPrice,
            this.yearLowPrice,
            this.marketCapitalization,
            stock
        );
    }
}
