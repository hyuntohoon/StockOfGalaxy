package com.sog.user.application.service;

import com.sog.user.domain.dto.TokenDTO;
import com.sog.user.domain.dto.UserInfoListResponseDTO;
import com.sog.user.domain.dto.UserInfoResponseDTO;
import com.sog.user.domain.dto.UserRegisterRequestDTO;
import com.sog.user.domain.dto.UserRegisterResponseDTO;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;

@Service
public interface UserService {

    // 회원가입
    public UserRegisterResponseDTO register(UserRegisterRequestDTO userRegisterRequestDTO);

    // 회원정보 조회
    public UserInfoResponseDTO getUserInfo(Long memberId);

    // refreshToken
    public TokenDTO refreshToken(String refreshToken);

    // 회원 아이디 중복 조회
    public boolean checkUserIdDuplicate(String userId);

    // 회원 닉네임 조회
    public String getNickname(Long memberId);

    // 유저 전체 리스트 조회
    public UserInfoListResponseDTO sendUserList();

    // 회원 탈퇴
    public boolean quitMember(Long memberId);

    public String extractRefreshTokenFromCookie(HttpServletRequest request);
}
