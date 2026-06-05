package com.shop.features.product.service;

import org.springframework.data.domain.Page;

import com.shop.features.product.dto.ProductFilterDto;
import com.shop.features.product.dto.ProductRequestDto;
import com.shop.features.product.dto.ProductResponseDto;


public interface ProductService {

    ProductResponseDto createProduct(ProductRequestDto request);

    Page<ProductResponseDto> getAllProducts(int page, int size);

    Page<ProductResponseDto> getFilteredProducts(
            ProductFilterDto filter,
            int page,
            int size,
            String sortBy,
            String direction
    );
}