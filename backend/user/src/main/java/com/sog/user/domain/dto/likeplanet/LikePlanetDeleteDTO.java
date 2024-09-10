package com.sog.user.domain.dto.likeplanet;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LikePlanetDeleteDTO {

    private long memberId;
    private String stockCode;

}
