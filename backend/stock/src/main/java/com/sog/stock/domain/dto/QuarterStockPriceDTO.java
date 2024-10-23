package com.sog.stock.domain.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sog.stock.domain.enums.QuarterType;
import com.sog.stock.domain.model.QuarterStockHistory;
import com.sog.stock.domain.model.Stock;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class QuarterStockPriceDTO {

    @JsonProperty("quarter_type")
    private QuarterType quarterType;

    @JsonProperty("stock_start_date")
    private String stockStartDate;

    @JsonProperty("stock_open_price")
    private Integer stockOpenPrice;

    @JsonProperty("stock_close_price")
    private Integer stockClosePrice;

    @JsonProperty("stock_high_price")
    private Integer stockHighPrice;

    @JsonProperty("stock_low_price")
    private Integer stockLowPrice;

    @JsonProperty("stock_acml_vol")
    private Long stockAcmlVol;

    @JsonProperty("stock_acml_tr_pbmn")
    private Long stockAcmlTrPbmn;

    @JsonProperty("stock_code")
    private String stockCode;

    // entity to dto
    public static QuarterStockPriceDTO fromEntity(QuarterStockHistory quarterStockHistory) {
        return QuarterStockPriceDTO.builder()
            .quarterType(quarterStockHistory.getQuarterType())
            .stockStartDate(quarterStockHistory.getStock_start_date())
            .stockOpenPrice(quarterStockHistory.getStock_open_price())
            .stockClosePrice(quarterStockHistory.getStock_close_price())
            .stockHighPrice(quarterStockHistory.getStock_high_price())
            .stockLowPrice(quarterStockHistory.getStock_low_price())
            .stockAcmlVol(quarterStockHistory.getStock_acml_vol())
            .stockAcmlTrPbmn(quarterStockHistory.getStock_acml_tr_pbmn())
            .stockCode(quarterStockHistory.getStock().getStockCode())
            .build();
    }

    // dto to entity
    public QuarterStockHistory toEntity(Stock stock) {
        return new QuarterStockHistory(
            null, // id값
            this.quarterType,
            this.stockStartDate,
            this.stockOpenPrice,
            this.stockClosePrice,
            this.stockHighPrice,
            this.stockLowPrice,
            this.stockAcmlVol,
            this.stockAcmlTrPbmn,
            stock
        );
    }
}
