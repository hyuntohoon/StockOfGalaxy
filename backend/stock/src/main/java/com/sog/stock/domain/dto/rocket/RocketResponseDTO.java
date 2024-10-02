package com.sog.stock.domain.dto.rocket;

import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RocketResponseDTO {

    private String nickname;
    private int characterType;
    private LocalDateTime createdAt;
    private String message;
    private int price;

}
