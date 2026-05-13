package com.shop.features.order.service;

import java.util.List;

import com.shop.features.order.dto.OrderResponseDto;
import com.shop.features.order.dto.UpdateOrderStatusDto;

public interface OrderService {
		OrderResponseDto placeOrder(String email);
		List<OrderResponseDto> getMyOrders(String email);
		
		OrderResponseDto updateOrderStatus(
				Long OrderId,
				UpdateOrderStatusDto request);
				
				
				List<OrderResponseDto> getAllOrders();
		
}
