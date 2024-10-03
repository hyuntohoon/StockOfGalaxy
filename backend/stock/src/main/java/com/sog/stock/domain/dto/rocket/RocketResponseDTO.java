package com.sog.stock.domain.dto.rocket;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RocketResponseDTO {

    private Integer rocketId;
    private Long memberId;
    private String nickname;
    private int characterType;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;
    private String message;
    private int price;

}
