package com.sog.user.application.service;

import com.sog.user.domain.dto.UserRegisterRequestDTO;
import com.sog.user.domain.dto.UserRegisterResponseDTO;
import org.springframework.stereotype.Service;

@Service
public interface UserService {

    // 회원가입
    public UserRegisterResponseDTO register(UserRegisterRequestDTO userRegisterRequestDTO);

    // 회원정보 조회

    // refreshToken

    // 회원 아이디 중복 조회

    // 회원 닉네임 조회
    public String getNickname(Long memberId);


}
