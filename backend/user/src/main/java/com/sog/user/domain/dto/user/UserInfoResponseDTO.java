package com.sog.user.domain.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoResponseDTO {

    private String userId;
    private String nickname;
    private String email;
    private Integer characterType;
    private boolean isQuit;

}
