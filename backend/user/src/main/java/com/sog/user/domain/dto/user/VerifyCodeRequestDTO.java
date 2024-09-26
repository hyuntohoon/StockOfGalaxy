package com.sog.user.domain.dto.user;

import lombok.Data;

@Data
public class VerifyCodeRequestDTO {

    private String userId;
    private String code;

}
