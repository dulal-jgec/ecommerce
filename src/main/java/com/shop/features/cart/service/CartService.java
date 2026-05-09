package com.shop.features.cart.service;

import com.shop.features.cart.dto.AddToCartRequestDto;
import com.shop.features.cart.dto.CartResponseDto;

public interface CartService {
		CartResponseDto addToCart(String email,AddToCartRequestDto request);
		CartResponseDto getCart(String email);
}
