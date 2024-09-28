package com.sog.stock.domain.dto;

import com.sog.stock.domain.model.DailyStockHistory;
import com.sog.stock.domain.model.Stock;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StockDailyPriceDTO {

    // 10개
    private String daily_stock_history_date; // 날짜
    private String prdy_ctrt; // 전일 대비율
    private Integer low_price;
    private Integer high_price;
    private Integer open_price;
    private Integer close_price;
    private String prdy_vrss; // 전일대비
    private String prdy_vrss_sign; // 전일 대비 부호
    private Long stoc_acml_vol; // 누적거래량
    private Long stock_acml_tr_pbmn; // 누적거래대금
    private String stock_code; // 종목번호


    // entity to dto
    public static StockDailyPriceDTO fromEntity(DailyStockHistory dailyStockHistory) {
        return StockDailyPriceDTO.builder()
            .daily_stock_history_date(dailyStockHistory.getDailyStockHistoryDate())
            .low_price(dailyStockHistory.getLowPrice())
            .high_price(dailyStockHistory.getHighPrice())
            .open_price(dailyStockHistory.getOpenPrice())
            .close_price(dailyStockHistory.getClosePrice())
            .prdy_vrss(dailyStockHistory.getPrdyVrss())
            .prdy_vrss_sign(dailyStockHistory.getPrdyVrssSign())
            .prdy_ctrt(dailyStockHistory.getPrdyCtrt())
            .stoc_acml_vol(dailyStockHistory.getStockAcmlVol())
            .stock_acml_tr_pbmn(dailyStockHistory.getStockAcmlTrPbmn())
            .stock_code(dailyStockHistory.getStock().getStock_code()) // Stock 객체에서 stockCode 추출
            .build();
    }

    // dto to entity
    public DailyStockHistory toEntity(Stock stock) {
        return new DailyStockHistory(
            null, // id값
            this.daily_stock_history_date,
            this.open_price,
            this.close_price,
            this.high_price,
            this.low_price,
            this.stoc_acml_vol,
            this.stock_acml_tr_pbmn,
            this.prdy_vrss,
            this.prdy_vrss_sign,
            this.prdy_ctrt,
            stock
        );
    }


}
