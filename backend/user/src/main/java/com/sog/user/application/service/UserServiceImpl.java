package com.sog.user.application.service;

import com.sog.user.domain.dto.UserRegisterRequestDTO;
import com.sog.user.domain.dto.UserRegisterResponseDTO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class UserServiceImpl implements UserService{

    @Override
    public UserRegisterResponseDTO register(UserRegisterRequestDTO userRegisterRequestDTO) {
        return null;
    }

    @Override
    public String getNickname(Long memberId) {
        return "";
    }
}
