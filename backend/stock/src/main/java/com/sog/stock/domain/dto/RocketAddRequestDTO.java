package com.sog.stock.domain.dto;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class RocketAddRequestDTO {

    private Long memberId;
    private String nickname;
    private int price;
    private String message;
    private LocalDateTime createdAt;
    private int characterType;

}
