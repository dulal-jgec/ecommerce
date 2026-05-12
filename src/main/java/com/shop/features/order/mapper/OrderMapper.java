package com.shop.features.order.mapper;

import java.util.List;

import com.shop.features.order.dto.OrderItemResponseDto;
import com.shop.features.order.dto.OrderResponseDto;
import com.shop.features.order.entity.Order;
 
public class OrderMapper {
		
	public static OrderResponseDto toResponseDto(Order order) {
		List<OrderItemResponseDto> items=order.getItems()
				.stream()
				.map(item->OrderItemResponseDto.builder()
						.productName(item.getProduct().getName())
						.quantity(item.getQuantity())
						.price(item.getPrice())
						.build())
						
						.toList();
		return OrderResponseDto.builder()
				.orderId(order.getId())
				.items(items)
				.totalPrice(order.getTotalPrice())
				.status(order.getStatus())
				.createdAt(order.getCreatedAt())
				.build();
				
	}
}
