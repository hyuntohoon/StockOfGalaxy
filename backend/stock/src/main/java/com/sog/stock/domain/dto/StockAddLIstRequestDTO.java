package com.sog.stock.domain.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;

@Data
public class StockAddLIstRequestDTO {

    List<StockAddRequestDTO> stockAddRequestDTOList;
}
