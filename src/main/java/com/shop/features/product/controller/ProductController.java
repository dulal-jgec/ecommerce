package com.shop.features.product.controller;

import com.shop.common.dto.ApiResponse;
import com.shop.features.product.dto.ProductFilterDto;
import com.shop.features.product.dto.ProductRequestDto;
import com.shop.features.product.dto.ProductResponseDto;
import com.shop.features.product.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.lang.module.ModuleDescriptor.Builder;
import java.math.BigDecimal;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping
    public ResponseEntity<ApiResponse<ProductResponseDto>> createProduct(
            @Valid @RequestBody ProductRequestDto request
    ) {
        ProductResponseDto response = productService.createProduct(request);
        return ResponseEntity.ok(
        	    ApiResponse.<ProductResponseDto>builder()
        	        .success(true)
        	        .message("Product created successfully")
        	        .data(response)
        	        .build()
        	);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<ProductResponseDto>>> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
 
        var result = productService.getAllProducts(page, size);

        return ResponseEntity.ok(
        		ApiResponse.<Page<ProductResponseDto>>builder()
        		.success(true)
        		.message("Product fetched succesfully")
        		.data(result)
        		.build()
);
    }
    
    @GetMapping("/search")
    public ResponseEntity<?> searchProducts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String direction
    ) {

        ProductFilterDto filter = new ProductFilterDto();
        filter.setCategory(category);
        filter.setMinPrice(minPrice);
        filter.setMaxPrice(maxPrice);

        var result = productService.getFilteredProducts(filter, page, size,sortBy,direction);

        return ResponseEntity.ok(
        		ApiResponse.<Page<ProductResponseDto>>builder()
        		.success(true)
        		.message("Filtered products fetched")
        		.data(result)
        		.build()
);
    }
    
    
    
    
    
    
}