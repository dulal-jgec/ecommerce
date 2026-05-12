package com.shop.features.order.service;

import java.util.List;

import com.shop.features.order.dto.OrderResponseDto;

public interface OrderService {
		OrderResponseDto placeOrder(String email);
		List<OrderResponseDto> getMyOrders(String email);
}
