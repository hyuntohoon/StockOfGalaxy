package com.sog.user.application.service.user;

import com.sog.user.domain.dto.user.TokenDTO;
import com.sog.user.domain.dto.user.UserInfoForStockResponseDTO;
import com.sog.user.domain.dto.user.UserInfoListResponseDTO;
import com.sog.user.domain.dto.user.UserInfoResponseDTO;
import com.sog.user.domain.dto.user.UserInfoToSingleResponseDTO;
import com.sog.user.domain.dto.user.UserRegisterRequestDTO;
import com.sog.user.domain.dto.user.UserRegisterResponseDTO;
import com.sog.user.domain.model.Member;
import com.sog.user.domain.repository.UserRepository;
import com.sog.user.global.util.UserValidationUtil;
import com.sog.user.infrastructure.security.AuthenticationProviderService;
import com.sog.user.infrastructure.security.JwtTokenProvider;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import java.time.Duration;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;


@Slf4j
@Service
public class UserServiceImpl implements UserService {

    private final AuthenticationProviderService authenticationProviderService;
    private final UserRepository userRepository;
    private final RedisService redisService;
    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    public UserServiceImpl(AuthenticationProviderService authenticationProviderService,
        UserRepository userRepository, @Lazy JwtTokenProvider jwtTokenProvider,
        RedisService redisService) {
        this.authenticationProviderService = authenticationProviderService;
        this.userRepository = userRepository;
        this.jwtTokenProvider = jwtTokenProvider;
        this.redisService = redisService;
    }


    @Override
    @Transactional
    public UserRegisterResponseDTO register(UserRegisterRequestDTO userRegisterRequestDTO) {

        // Validate userID
        if (!UserValidationUtil.validateUserID(userRegisterRequestDTO.getUserId())) {
            throw new IllegalArgumentException("Invalid userID format");
        }

        // Validate password
        if (!UserValidationUtil.validatePassword(userRegisterRequestDTO.getPassword())) {
            throw new IllegalArgumentException("Invalid password format");
        }

        // Validate nickname
        if (!UserValidationUtil.validateNickname(userRegisterRequestDTO.getNickname())) {
            throw new IllegalArgumentException("Invalid nickname format");
        }

        Member member = Member.builder()
            .userId(userRegisterRequestDTO.getUserId())
            .password(authenticationProviderService.passwordEncoder()
                .encode(userRegisterRequestDTO.getPassword()))
            .nickname(userRegisterRequestDTO.getNickname())
            .email(userRegisterRequestDTO.getEmail())
            .characterType(userRegisterRequestDTO.getCharacterType())
            .isQuit(false)
            .build();

        // Member entity save
        Member savedMember = userRepository.save(member);

        return new UserRegisterResponseDTO(savedMember);
    }

    @Override
    public UserInfoResponseDTO getUserInfo(Long memberId) {
        Member member = userRepository.findById(memberId)
            .orElseThrow(() -> new EntityNotFoundException("유저를 찾을 수 없습니다."));

        // User entity를 userInfoResponseDTO로 변경
        return new UserInfoResponseDTO(
            member.getUserId(),
            member.getNickname(),
            member.getEmail(),
            member.getCharacterType(),
            member.getIsQuit()
        );
    }

    @Override
    public TokenDTO refreshToken(String refreshToken) {
        // redis에서 refreshtoken 조회
        Long memberId = jwtTokenProvider.extractMemberId(refreshToken);
        String storedRefreshToken = redisService.getValue(String.valueOf(memberId));

        // 리프레시 토큰이 유효한지 확인
        if (storedRefreshToken == null || !storedRefreshToken.equals(refreshToken)) {
            throw new RuntimeException("리프레시 토큰이 유효하지 않습니다.");
        }

        // 토큰의 유효성 검사
        jwtTokenProvider.validateToken(refreshToken);

        // 새로운 엑세스 토큰 생성
        String newAccessToken = jwtTokenProvider.generateAccessToken(Long.valueOf(memberId));
        String newRefreshToken = jwtTokenProvider.generateRefreshToken(Long.valueOf(memberId));

        // redis에 새로운 리프레시 토큰 저장
        Duration expiration = Duration.ofHours(24);
        redisService.setValues(String.valueOf(memberId), newRefreshToken, expiration);

        // 클라이언트에 반환할 TokenDTO
        TokenDTO newToken = new TokenDTO();
        newToken.setAccessToken(newAccessToken);
        newToken.setRefreshToken(newRefreshToken);

        return newToken;
    }

    @Override
    public boolean checkUserIdDuplicate(String userId) {
        return userRepository.existsByUserId(userId);
    }

    @Override
    public String getNickname(Long memberId) {
        return userRepository.findById(memberId).orElseThrow().getNickname();
    }

    @Override
    public UserInfoListResponseDTO sendUserList() {
        // 모든 유저의 정보 조회
        List<Member> members = userRepository.findAll();

        List<UserInfoToSingleResponseDTO> userInfoToSingleList = members.stream()
            .map(member -> new UserInfoToSingleResponseDTO(member.getMemberId(),
                member.getNickname(), member.getIsQuit()))
            .collect(Collectors.toList());

        return new UserInfoListResponseDTO(userInfoToSingleList);
    }

    @Override
    @Transactional
    public boolean quitMember(Long memberId) {
        // Member 조회
        Member member = userRepository.findById(memberId)
            .orElseThrow(() -> new RuntimeException("Member not found"));

        // 회원 탈퇴 처리 (soft delete)
        member.quit();

        // 변경 사항 저장
        userRepository.save(member);

        return true;  // 성공적으로 탈퇴 처리되면 true 반환
    }

    @Override
    public String extractRefreshTokenFromCookie(HttpServletRequest request) {
        String refreshToken = null;
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("refresh")) {
                    refreshToken = cookie.getValue();
                    log.info("쿠키입니다. " + refreshToken);
                }
            }
        }
        return refreshToken;
    }

    @Override
    public UserInfoForStockResponseDTO getUserInfoForStock(Long memberId) {
        // memberId를 통해 유저 정보 찾기
        Member member = userRepository.findById(memberId)
            .orElseThrow(() -> new IllegalArgumentException("해당 회원을 찾을 수 없습니다. ID: " + memberId));

        // DTO에 필요한 정보 담기
        return new UserInfoForStockResponseDTO(member.getNickname(), member.getCharacterType());
    }
}
