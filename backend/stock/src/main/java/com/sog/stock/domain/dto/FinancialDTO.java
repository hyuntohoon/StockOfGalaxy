package com.sog.stock.domain.dto;

import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FinancialDTO {

    private String stock_code;
    private String stac_yymm;
    private BigDecimal current_assets;
    private BigDecimal current_liabilities;
    private BigDecimal total_liabilities;
    private BigDecimal total_equity;

}
