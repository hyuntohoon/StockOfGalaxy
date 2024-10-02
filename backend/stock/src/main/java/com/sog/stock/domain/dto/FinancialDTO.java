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

    @JsonProperty("current_liabilities")
    private BigDecimal currentLiabilities;

    @JsonProperty("total_liabilities")
    private BigDecimal totalLiabilities;

    @JsonProperty("total_equity")
    private BigDecimal totalEquity;

}
