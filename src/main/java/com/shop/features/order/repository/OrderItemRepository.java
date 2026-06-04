package com.shop.features.order.repository;

import com.shop.features.order.entity.OrderItem;
import com.shop.features.order.entity.OrderStatus;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
	Optional<OrderItem>findFirstByOrderUserIdAndProductIdAndOrderStatus(
			Long userId,
			Long productId,
			OrderStatus status
			);
}