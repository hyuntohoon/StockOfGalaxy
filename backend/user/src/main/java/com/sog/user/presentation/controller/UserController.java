package com.sog.user.presentation.controller;

import com.sog.user.application.service.PasswordResetService;
import com.sog.user.application.service.RedisService;
import com.sog.user.application.service.UserService;
import com.sog.user.domain.dto.LogoutDTO;
import com.sog.user.domain.dto.PasswordResetRequestDTO;
import com.sog.user.domain.dto.TokenDTO;
import com.sog.user.domain.dto.UserInfoResponseDTO;
import com.sog.user.domain.dto.UserPasswordRequestDTO;
import com.sog.user.domain.dto.UserRegisterRequestDTO;
import com.sog.user.domain.dto.UserRegisterResponseDTO;
import com.sog.user.domain.dto.VerifyCodeRequestDTO;
import com.sog.user.infrastructure.security.JwtCookieUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("user")
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final UserService userService;
    private final RedisService redisService;
    private final JwtCookieUtil jwtCookieUtil;
    private final PasswordResetService passwordResetService;

    // 회원가입
    @PostMapping("/public/join")
    public ResponseEntity<?> register(@RequestBody UserRegisterRequestDTO registerDTO) {
        log.info("회원가입 요청 requestDto : {} ", registerDTO);
        UserRegisterResponseDTO registerResponseDTO = userService.register(registerDTO);
        return ResponseEntity.ok(registerResponseDTO);
    }

    // 아이디 중복확인
    @GetMapping("/public/validate/{userId}")
    public ResponseEntity<?> checkUserId(@PathVariable("userId") String userId) {
        if (userService.checkUserIdDuplicate(userId)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 사용중인 아이디입니다.");
        } else {
            return ResponseEntity.ok("사용가능한 아이디입니다.");
        }
    }

    // 로그아웃
    @PostMapping("/public/logout")
    public ResponseEntity<?> logout(@RequestBody LogoutDTO logoutDTO) {
        try {
            log.info("로그아웃 요청 수신: memberId={}", logoutDTO.getMemberId());

            // Redis에서 해당 사용자 정보 삭제
            redisService.deleteValue(String.valueOf(logoutDTO.getMemberId()));

            log.info("로그아웃 성공: memberId={}", logoutDTO.getMemberId());
            return ResponseEntity.ok("로그아웃이 성공적으로 되었습니다.");
        } catch (Exception e) {
            log.error("로그아웃 중 오류 발생: memberId={}, 오류 메시지={}", logoutDTO.getMemberId(),
                e.getMessage());
            return ResponseEntity.status(500).body("로그아웃 중 오류가 발생했습니다.");
        }
    }

    // 비밀번호 변경
    @PostMapping("/public/change-password")
    public ResponseEntity<?> changePassword(
        @RequestBody PasswordResetRequestDTO passwordResetRequestDTO) {
        passwordResetService.resetPassword(passwordResetRequestDTO.getUserId(),
            passwordResetRequestDTO.getNewPassword());

        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 이메일 인증번호 전송
    @PostMapping("/public/request-verification-code")
    public ResponseEntity<?> sendVerificationCode(
        @RequestBody UserPasswordRequestDTO passwordRequestDTO) {
        try {
            String userId = passwordRequestDTO.getUserId();
            passwordResetService.sendResetNumber(userId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (UsernameNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 인증번호 일치 확인
    @PostMapping("/public/request-verification")
    public ResponseEntity<?> verifyCode(@RequestBody VerifyCodeRequestDTO verifyCodeRequestDTO) {
        boolean isCorrect = passwordResetService.validateAuthCode(verifyCodeRequestDTO.getUserId(),
            verifyCodeRequestDTO.getCode());
        if (isCorrect) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // 회원 탈퇴
    @DeleteMapping("/quit")
    public ResponseEntity<?> quitUser(@RequestHeader("memberId") Long memberId) {
        boolean isQuit = userService.quitMember(memberId);

        if (isQuit) {
            redisService.deleteValue(String.valueOf(memberId));
            return ResponseEntity.ok("회원 탈퇴가 완료되었습니다.");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("회원 탈퇴에 실패했습니다.");
    }

    // token 재발급
    @PostMapping("/public/reissue")
    public ResponseEntity<?> refreshAccessToken(HttpServletRequest request,
        HttpServletResponse response) {
        // 쿠키에서 리프레시 토큰 추출
        String refresh = userService.extractRefreshTokenFromCookie(request);
        if (refresh == null) {
            return new ResponseEntity<>("refresh token null", HttpStatus.BAD_REQUEST);
        }

        // 새로운 토큰 발급
        TokenDTO newAccessToken = userService.refreshToken(refresh);

        response.setHeader("Authorization", "Bearer " + newAccessToken.getAccessToken());
        response.addCookie(jwtCookieUtil.createCookie("refresh", newAccessToken.getRefreshToken()));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 유저 정보 조회
    @GetMapping("/info")
    public ResponseEntity<?> userInfo(@RequestHeader("memberId") Long memberId) {
        UserInfoResponseDTO userInfo = userService.getUserInfo(memberId);

        return ResponseEntity.ok(userInfo);
    }

    /**
     * 행성 관련 api
     * */

    // 관심 행성 조회

    // 관심 행성 추가

    // 관심 행성 삭제


}