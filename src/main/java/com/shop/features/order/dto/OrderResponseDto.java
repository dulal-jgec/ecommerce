package com.shop.features.order.dto;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.shop.features.order.entity.OrderStatus;

@Getter
@Builder
public class OrderResponseDto {

    private Long orderId;

    private List<OrderItemResponseDto> items;

    private BigDecimal totalPrice;

    private OrderStatus status;

    private LocalDateTime createdAt;
}