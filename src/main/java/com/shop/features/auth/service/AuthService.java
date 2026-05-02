package com.shop.features.auth.service;

import com.shop.features.auth.dto.LoginRequestDto;
import com.shop.features.auth.dto.RegisterRequestDto;

public interface AuthService {
    void register(RegisterRequestDto request);
    String login(LoginRequestDto request);
    }