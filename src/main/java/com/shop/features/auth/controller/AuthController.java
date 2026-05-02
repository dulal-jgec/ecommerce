package com.shop.features.auth.controller;

import java.lang.module.ModuleDescriptor.Builder;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.shop.common.dto.ApiResponse;
import com.shop.features.auth.dto.LoginRequestDto;
import com.shop.features.auth.dto.RegisterRequestDto;
import com.shop.features.auth.service.AuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
		
	private final AuthService authService;
	
	@PostMapping("/register")
	
	public ResponseEntity<ApiResponse<?>>register(
			@Valid @RequestBody RegisterRequestDto request
			){
		authService.register(request);
		
		return ResponseEntity.ok(
				ApiResponse.builder()
				.success(true)
				.message("User registered succesfuly")
				.build()
				);
	} 
	
	@PostMapping("/login")
	public ResponseEntity<ApiResponse<?>> login(
	        @Valid @RequestBody LoginRequestDto request
	) {

	    String token = authService.login(request);

	    return ResponseEntity.ok(
	            ApiResponse.builder()
	                    .success(true)
	                    .message("Login successful")
	                    .data(token)
	                    .build()
	    );
	}
}
