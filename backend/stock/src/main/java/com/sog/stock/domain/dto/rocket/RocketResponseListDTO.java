package com.sog.stock.domain.dto.rocket;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RocketResponseListDTO {

    private List<RocketResponseDTO> rocketList;
}
