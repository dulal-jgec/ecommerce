package com.shop.features.cart.controller;

import com.shop.common.dto.ApiResponse;
import com.shop.features.cart.dto.AddToCartRequestDto;
import com.shop.features.cart.service.CartService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @PostMapping
    public ResponseEntity<ApiResponse<?>> addToCart(
            Authentication authentication,
            @Valid @RequestBody AddToCartRequestDto request
    ) {

        String email = authentication.getName();

        var response = cartService.addToCart(email, request);

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Item added to cart")
                        .data(response)
                        .build()
        );
    }

    @GetMapping
    public ResponseEntity<ApiResponse<?>> getCart(
            Authentication authentication
    ) {

        String email = authentication.getName();

        var response = cartService.getCart(email);

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Cart fetched successfully")
                        .data(response)
                        .build()
        );
    }
}