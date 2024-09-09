package com.sog.user.application.service;

import com.sog.user.domain.dto.UserPasswordRequestDTO;
import com.sog.user.domain.model.Member;
import com.sog.user.domain.repository.UserRepository;
import com.sog.user.infrastructure.security.AuthenticationProviderService;
import java.security.SecureRandom;
import java.time.Duration;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class PasswordResetServiceImpl implements PasswordResetService {

    private final UserRepository userRepository;
    private final RedisService redisService;
    private final EmailService emailService;
    private final AuthenticationProviderService authenticationProviderService;

    @Override
    public UserPasswordRequestDTO requestUserId(String userId) {
        // 사용자 정보 조회
        Member member = userRepository.findByUserId(userId)
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        UserPasswordRequestDTO userPasswordRequestDTO = new UserPasswordRequestDTO();
        userPasswordRequestDTO.setUserId(member.getUserId());
        return userPasswordRequestDTO;
    }

    // 임읠오 생성된 번호 유저의 이메일로 전송
    @Override
    public void sendResetNumber(String userId) {
        // 사용자 정보 조회
        Member member = userRepository.findByUserId(userId)
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // 랜덤 숫자 6자리 생성
        String resetCode = generateRondomCode(6);

        // 생성한 인증정보를 redis에 설정하여 나중에 검증할 수 있도록 한다. (redis에서 유효시간도 함께 설정)
        Duration duration = Duration.ofMinutes(3);
        redisService.setValues(userId, resetCode, duration);

        // 이메일 전송
        String emailContent = "Stock Of Galaxy: 인증번호는 다음과 같습니다." + resetCode;
        emailService.sendEmail(member.getEmail(), "Stock Of Galaxy 인증번호 입니다.", emailContent);
    }

    // 비밀번호 재설정
    @Override
    public void resetPassword(String userId, String newPassword) {
        // 사용자 조회
        Member member = userRepository.findByUserId(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        // 비밀번호 암호화
        String encodedPassword = authenticationProviderService.passwordEncoder()
            .encode(newPassword);

        // 비밀번호 업데이트 - 메서드 호출
        member.updatePassword(encodedPassword);

        // 변경 사항 저장
        userRepository.save(member);
    }

    @Override
    public boolean validateAuthCode(String userId, String code) {
        // redis에서 인증 코드를 가져온다.
        String storedCode = redisService.getValue(userId);

        // 저장된 인증 코드와 입력한 인증 코드 비교
        // 인증코드가 expired 안 됐거나 존재하는 경우
        if (storedCode != null && storedCode.equals(code)) {
            // 인증 코드가 일치한다면
            return true;
        } else {
            // 인증코드가 일치하지 않는다면
            return false;
        }
    }

    // 랜덤한 번호 6자리 생성
    private String generateRondomCode(int length) {
        SecureRandom random = new SecureRandom();
        return IntStream.range(0, length)
            .map(i -> random.nextInt(10))
            .mapToObj(String::valueOf)
            .collect(Collectors.joining());
    }
}
