package com.sog.stock.domain.dto.rocket;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class RocketAddRequestDTO {

    private Long memberId;
    private String stockCode;
    private int price;
    private String message;

}
