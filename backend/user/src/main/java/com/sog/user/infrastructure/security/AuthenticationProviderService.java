package com.sog.user.infrastructure.security;

import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationProviderService {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    /*
    * PasswordEncoderFactories.createDelegatingPasswordEncoder()는
    * 여러 종류의 PasswordEncoder를 지원하며,
    * 기본적으로 bcrypt 알고리즘을 사용하여 비밀번호를 암호화
    * */

}
