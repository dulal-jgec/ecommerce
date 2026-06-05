package com.shop.features.cart.mapper;

import java.math.BigDecimal;
import java.util.List;

import com.shop.features.cart.dto.CartItemResponseDto;
import com.shop.features.cart.dto.CartResponseDto;
import com.shop.features.cart.entity.Cart;
import com.shop.features.cart.entity.CartItem;

public class CartMapper {
	
	public static CartResponseDto toResponse(Cart cart) {
		List<CartItemResponseDto> items= cart.getItems()
				.stream()
				.map(CartMapper::toItemResponse)
				.toList();
		
		  BigDecimal total = cart.getItems()
	                .stream()
	                .map(item ->
	                        item.getPrice()
	                                .multiply(BigDecimal.valueOf(item.getQuantity()))
	                )
	                .reduce(BigDecimal.ZERO,BigDecimal::add);
		  
		  return CartResponseDto.builder()
				  .cartId(cart.getId())
				  .items(items)
				  .totalPrice(total)
				  .build();
	}
	
	
	private static CartItemResponseDto toItemResponse(CartItem item) {
		return CartItemResponseDto.builder()
				.productId(item.getProduct().getId())
				.productName(item.getProduct().getName())
				.quantity(item.getQuantity())
				.price(item.getPrice())
				.build();
	}
}
