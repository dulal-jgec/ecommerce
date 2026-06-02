package com.shop.features.order.dto;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@Builder
public class OrderItemResponseDto {

    private String productName;
    private Integer quantity;
    private BigDecimal price;
    
}