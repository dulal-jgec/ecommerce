package com.shop.features.product.mapper;

import com.shop.features.product.dto.ProductRequestDto;
import com.shop.features.product.dto.ProductResponseDto;
import com.shop.features.product.entity.Product;

public class ProductMapper {

	// DTO -> Entity
	
	public static Product toEntity(ProductRequestDto dto) {
		Product product = new Product();
		
		 product.setName(dto.getName());
	        product.setDescription(dto.getDescription());
	        product.setPrice(dto.getPrice());
	        product.setStock(dto.getStock());
	        product.setCategory(dto.getCategory());
	        product.setColor(dto.getColor());
	        product.setSize(dto.getSize());

	        return product;
	    }
	
	 // Entity → Response DTO
    public static ProductResponseDto toResponse(Product product) {
        return ProductResponseDto.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .stock(product.getStock())
                .category(product.getCategory())
                .color(product.getColor())
                .size(product.getSize())
                .build();
    }
}