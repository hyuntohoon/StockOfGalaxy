package com.sog.stock.domain.dto;

import com.sog.stock.domain.model.Stock;
import lombok.Builder;
import lombok.Data;

@Data
public class StockAddRequestDTO {

    private String stockCode;
    private String companyName;
    private String companyDescription;
    private boolean isDelisted;
}
