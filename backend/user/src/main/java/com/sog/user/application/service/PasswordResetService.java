package com.sog.user.application.service;

import com.sog.user.domain.dto.UserPasswordRequestDTO;
import org.springframework.stereotype.Service;

@Service
public interface PasswordResetService {

    // 사용자 정보 조회
    UserPasswordRequestDTO requestUserId(String userId);

    // 비밀번호 재설정 토큰 전송
    void sendResetNumber(String userId);

    // 비밀번호 재설정
    void resetPassword(String userId, String newPassword);

    // 인증번호 일치 여부 확인
    boolean validateAuthCode(String userId, String code);

}
