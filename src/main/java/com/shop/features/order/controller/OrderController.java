package com.shop.features.order.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shop.common.dto.ApiResponse;
import com.shop.features.order.dto.UpdateOrderStatusDto;
import com.shop.features.order.service.OrderService;

import jakarta.validation.Valid;
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
    
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin")
    public ResponseEntity<ApiResponse<?>>getAllOrders(){
    
    	var response = orderService.getAllOrders();
    	return ResponseEntity.ok(
    			ApiResponse.builder()
    			.success(true)
    			.message("All orders fetched successfully")
    			.data(response)
    			.build()
    			);
    			
    	}
    
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/admin/{orderId}/status")
    public ResponseEntity<ApiResponse<?>>updateOrderStatus(
    		@PathVariable Long orderId,
    		@Valid @RequestBody UpdateOrderStatusDto request
    		){
    			var response = orderService.updateOrderStatus(orderId, request);
    					return ResponseEntity.ok(
    							ApiResponse.builder()
    							.success(true)
    							.message("Order status updated successfully")
    							.data(response)
    							.build()
    				            );
    		}
   
}

 
















