package com.sog.stock.domain.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.math.BigDecimal;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StockDTO {

    @JsonProperty("stock_code")
    private String stockCode;

    @JsonProperty("corp_name")
    private String companyName;

    @JsonProperty("corp_description")
    private String companyDescription;

    @JsonProperty("est_dt")
    private String establishedYear;

    @JsonProperty("ceo_nm")
    private String ceo;

    @JsonProperty("hm_url")
    private String webSite;

    @JsonProperty("acc_mt")
    private String fiscalMonth;

    @JsonProperty("is_delisted")
    private boolean isDelisted;

}
