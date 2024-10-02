package com.sog.stock.domain.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FinancialDTO {

    @JsonProperty("stock_code")
    private String stockCode;

    @JsonProperty("stac_yymm")
    private String stacYymm;

    @JsonProperty("current_assets")
    private BigDecimal currentAssets;

    @JsonProperty("currentLiabilities")
    private BigDecimal current_liabilities;

    @JsonProperty("totalLiabilities")
    private BigDecimal total_liabilities;

    @JsonProperty("totalEquity")
    private BigDecimal total_equity;

}
