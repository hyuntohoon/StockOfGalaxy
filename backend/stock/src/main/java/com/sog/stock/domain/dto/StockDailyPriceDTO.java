package com.sog.stock.domain.dto;

import com.sog.stock.domain.model.DailyStockHistory;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StockDailyPriceDTO {

    // 10개
    private String dailyStockHistoryDate; // 날짜
    private String prdyCtrt; // 전일 대비율
    private Integer lowPrice;
    private Integer highPrice;
    private Integer startPrice;
    private Integer endPrice;
    private String prdyVrss; // 전일대비
    private String prdyVrssSign; // 전일 대비 부호
    private Long stockAcmlVol; // 누적거래량
    private Long stockAcmlTrPbmn; // 누적거래대금
    private String stockCode; // 종목번호


    // entity to dto
    public static StockDailyPriceDTO fromEntity(DailyStockHistory dailyStockHistory) {
        return StockDailyPriceDTO.builder()
            .dailyStockHistoryDate(dailyStockHistory.getDailyStockHistoryDate())
            .lowPrice(dailyStockHistory.getLowPrice())
            .highPrice(dailyStockHistory.getHighPrice())
            .startPrice(dailyStockHistory.getOpenPrice())
            .endPrice(dailyStockHistory.getClosePrice())
            .prdyVrss(dailyStockHistory.getPrdyVrss())
            .prdyVrssSign(dailyStockHistory.getPrdyVrssSign())
            .prdyCtrt(dailyStockHistory.getPrdyCtrt())
            .stockAcmlVol(dailyStockHistory.getStockAcmlVol())
            .stockAcmlTrPbmn(dailyStockHistory.getStockAcmlTrPbmn())
            .stockCode(dailyStockHistory.getStock().getStock_code()) // Stock 객체에서 stockCode 추출
            .build();
    }

}
