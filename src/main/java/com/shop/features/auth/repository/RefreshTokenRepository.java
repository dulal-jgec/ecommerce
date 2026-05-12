package com.shop.features.auth.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shop.features.auth.entity.RefreshToken;
import com.shop.features.user.entity.User;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
	
	Optional<RefreshToken> findByToken(String token);
	
	void deleteByUserId(Long userId);
	void deleteByUser(User user);
}
