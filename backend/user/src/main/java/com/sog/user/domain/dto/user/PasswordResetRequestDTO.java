package com.sog.user.domain.dto.user;

import lombok.Data;

@Data
public class PasswordResetRequestDTO {

    private String userId;
    private String newPassword;

}
