package com.sog.stock.domain.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StockTop8ListResponseDTO {

    private List<StockTop8ResponseDTO> stockTop8ResponseList;

}
