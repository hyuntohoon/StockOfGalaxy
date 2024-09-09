package com.sog.user.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserRegisterRequestDTO {

    private String userId;
    private String password;
    private String nickname;
    private String email;
    private int characterType;

}
