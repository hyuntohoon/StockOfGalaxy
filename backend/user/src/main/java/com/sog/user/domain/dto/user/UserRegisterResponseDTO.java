package com.sog.user.domain.dto.user;

import com.sog.user.domain.model.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserRegisterResponseDTO {

    private String userId;
    private String nickname;

    public UserRegisterResponseDTO(Member member) {
        this.userId = member.getUserId();
        this.nickname = member.getNickname();
    }

}
