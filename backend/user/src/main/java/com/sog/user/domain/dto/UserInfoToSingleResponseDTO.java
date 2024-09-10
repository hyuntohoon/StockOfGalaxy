package com.sog.user.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoToSingleResponseDTO {

    private Long memberId;
    private String nickname;
    private boolean isQuit;

}
