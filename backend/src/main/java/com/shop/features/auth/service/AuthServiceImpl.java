package com.shop.features.auth.service;

 import java.time.LocalDateTime;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.shop.common.exception.BadRequestException;
import com.shop.config.JwtService;
import com.shop.features.auth.dto.AuthResponseDto;
import com.shop.features.auth.dto.LoginRequestDto;
import com.shop.features.auth.dto.RegisterRequestDto;
import com.shop.features.auth.entity.RefreshToken;
import com.shop.features.auth.repository.RefreshTokenRepository;
import com.shop.features.user.entity.User;
import com.shop.features.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import jakarta.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
		
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;
	
	private final RefreshTokenRepository refreshTokenRepository;
	
	
	
	@Override
	public void register(RegisterRequestDto request) {
		
		// check duplicate email 
		if(userRepository.findByEmail(request.getEmail()).isPresent()) {
			throw new BadRequestException("Email alredy exists");
		}
		
		User user = new User();
		user.setEmail(request.getEmail());
		
		user.setPassword(passwordEncoder.encode(request.getPassword()));
		
		user.setRole("USER");
		
		userRepository.save(user);
	}
	
	@Transactional
	@Override
	public AuthResponseDto login(LoginRequestDto request) {

	    var user = userRepository.findByEmail(request.getEmail())
	            .orElseThrow(() -> new BadRequestException("Invalid credentials"));

	    if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
	        throw new BadRequestException("Invalid credentials");
	    }

	    String accessToken = jwtService.generateToken(user.getEmail(), user.getRole());

	    // delete old refresh token
	    refreshTokenRepository.deleteByUserId(user.getId());

	    // create new refresh token
	    RefreshToken refreshToken = new RefreshToken();

	    refreshToken.setToken(java.util.UUID.randomUUID().toString());

	    refreshToken.setUser(user);

	    refreshToken.setExpiryDate(LocalDateTime.now().plusDays(7));

	    refreshTokenRepository.save(refreshToken);

	    return AuthResponseDto.builder()
	            .accessToken(accessToken)
	            .refreshToken(refreshToken.getToken())
	            .build();
	}
	
	@Override
	public AuthResponseDto refreshToken(String token) {
		RefreshToken refreshToken = refreshTokenRepository.findByToken(token)
				.orElseThrow(()-> new BadRequestException("Invalid refresh Token"));
		
		if(refreshToken.getExpiryDate().isBefore(LocalDateTime.now())) {
			throw new BadRequestException("Refresh Token expired");
		}
		
		User user=  refreshToken.getUser();
		String newAccessToken  = jwtService.generateToken(user.getEmail(), user.getRole());
		
 return AuthResponseDto.builder()	
		 .accessToken(newAccessToken)
		 .refreshToken(token)
		 .build();
	}
	
	@Override
	public void logout(String token) {

	    var refreshToken = refreshTokenRepository.findByToken(token)
	            .orElseThrow(() -> new BadRequestException("Invalid token"));

	    refreshTokenRepository.delete(refreshToken);
	    
	    
	    
	}
}

















