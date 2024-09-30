package com.sog.stock.domain.dto;

import com.sog.stock.domain.model.DailyStockHistory;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StockDailyPriceResponseDTO {

    private String stockDate;
    private Integer lowPrice;
    private Integer highPrice;
    private Integer startPrice;
    private Integer endPrice;
    private String prdyVrss; // 전일대비
    private String prdyVrssSign; // 전일 대비 부호
    private String prdyCtrt; // 전일 대비율

    // entity to dto
    public static StockDailyPriceResponseDTO fromEntity(DailyStockHistory dailyStockHistory) {
        return StockDailyPriceResponseDTO.builder()
            .stockDate(dailyStockHistory.getDailyStockHistoryDate().toString())
            .lowPrice(dailyStockHistory.getLowPrice())
            .highPrice(dailyStockHistory.getHighPrice())
            .startPrice(dailyStockHistory.getOpenPrice())
            .endPrice(dailyStockHistory.getClosePrice())
            .prdyVrss(dailyStockHistory.getPrdyVrss())
            .prdyVrssSign(dailyStockHistory.getPrdyVrssSign())
            .prdyCtrt(dailyStockHistory.getPrdyCtrt())
            .build();
    }

}
