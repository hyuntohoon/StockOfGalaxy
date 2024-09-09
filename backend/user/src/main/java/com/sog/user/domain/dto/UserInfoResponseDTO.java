package com.sog.user.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
@NoArgsConstructor
public class UserInfoResponseDTO {

    private String userId;
    private String nickname;
    private String email;

}
