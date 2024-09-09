package com.sog.user.domain.dto;

import lombok.Data;

@Data
public class PasswordResetRequestDTO {

    private String userId;
    private String newPassword;

}
