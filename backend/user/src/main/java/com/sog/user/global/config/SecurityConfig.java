package com.sog.user.global.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sog.user.application.service.user.MemberDetailService;
import com.sog.user.application.service.user.RedisService;
import com.sog.user.infrastructure.security.JwtAuthenticationFilter;
import com.sog.user.infrastructure.security.JwtCookieUtil;
import com.sog.user.infrastructure.security.JwtTokenProvider;
import com.sog.user.infrastructure.security.LoginFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig {

    private final AuthenticationConfiguration authenticationConfiguration;
    private final JwtTokenProvider jwtTokenProvider;
    private final RedisService redisService;
    private final MemberDetailService memberDetailService;
    private final JwtCookieUtil jwtCookieUtil;

    @Bean
    public AuthenticationManager authenticationManager() throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    public ObjectMapper objectMapper() {
        return new ObjectMapper();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        LoginFilter loginFilter = new LoginFilter(authenticationManager(), jwtTokenProvider,
                objectMapper(), redisService, memberDetailService, jwtCookieUtil);
        loginFilter.setFilterProcessesUrl("/api/user/login"); // 로그인 엔드포인트

        httpSecurity
                // CORS 설정 제거: Gateway에서만 CORS 처리
                .csrf(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(user -> user
                        .requestMatchers("/api/user/login", "/api/user/join",
                                "/api/user/validate/**", "/api/user/request-verification-code",
                                "/api/user/request-verification", "/api/user/change-password",
                                "/api/user/reissue", "/api/user/logout")
                        .permitAll()
                        .anyRequest().authenticated())
                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider),
                        UsernamePasswordAuthenticationFilter.class)
                .addFilterAt(loginFilter, UsernamePasswordAuthenticationFilter.class) // 로그인 필터 추가
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        return httpSecurity.build();
    }
}
