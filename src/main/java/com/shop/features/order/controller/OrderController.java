package com.shop.features.order.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping; 
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shop.common.dto.ApiResponse;
import com.shop.features.order.service.OrderService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    
    @PostMapping
    public ResponseEntity<ApiResponse<?>> placeOrder(
            Authentication authentication
    ) {

        String email = authentication.getName();

        var response = orderService.placeOrder(email);

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Order placed successfully")
                        .data(response)
                        .build()
        );
    }

    @GetMapping
    public ResponseEntity<ApiResponse<?>> getMyOrders(
            Authentication authentication
    ) {

        String email = authentication.getName();

        var response = orderService.getMyOrders(email);

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Orders fetched successfully")
                        .data(response)
                        .build()
        );
    }
}