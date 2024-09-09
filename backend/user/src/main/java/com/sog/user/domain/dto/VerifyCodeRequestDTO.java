package com.sog.user.domain.dto;

import lombok.Data;

@Data
public class VerifyCodeRequestDTO {

    private String userId;
    private String code;

}
