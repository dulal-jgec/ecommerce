package com.shop.features.auth.service;

 import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.shop.common.exception.BadRequestException;
import com.shop.config.JwtService;
import com.shop.features.auth.dto.LoginRequestDto;
import com.shop.features.auth.dto.RegisterRequestDto;
import com.shop.features.user.entity.User;
import com.shop.features.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
		
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;
	
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
	
	@Override
	public String login(LoginRequestDto request) {

	    var user = userRepository.findByEmail(request.getEmail())
	            .orElseThrow(() -> new BadRequestException("Invalid credentials"));

	    // 🔐 password check
	    if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
	        throw new BadRequestException("Invalid credentials");
	    }

	    // 🔐 generate token
	    return jwtService.generateToken(user.getEmail(),user.getRole());
	}
}
