package com.shop.features.product.service;

import com.shop.common.exception.BadRequestException;
import com.shop.features.product.dto.ProductFilterDto;
import com.shop.features.product.dto.ProductRequestDto;
import com.shop.features.product.dto.ProductResponseDto;
import com.shop.features.product.entity.Product;
import com.shop.features.product.mapper.ProductMapper;
import com.shop.features.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import com.shop.features.product.specification.ProductSpecification;
import org.springframework.data.domain.Sort;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    
    private static final Logger log = LoggerFactory.getLogger(ProductServiceImpl.class);
    	
    @Override
    public ProductResponseDto createProduct(ProductRequestDto request) {
    	
    	log.info("Creating product with name={}", request.getName());
    	
        //  Extra business validation (defense-in-depth)
        if (request.getPrice().compareTo(java.math.BigDecimal.ONE) < 0) {
        	log.warn("invalid price rewcived : {}",request.getPrice());
            throw new BadRequestException("Price must be at least 1");
        }
        
        

        // DTO → Entity
        Product product = ProductMapper.toEntity(request);

        // Save to DB
        Product savedProduct = productRepository.save(product);
        
        log.info("Product created successfully with id={}", savedProduct.getId());
        
        // Entity → Response DTO
        return ProductMapper.toResponse(savedProduct);
    }
    
    @Override
    public Page<ProductResponseDto> getAllProducts(int page, int size) {

        if (page < 0) page = 0;

        if (size > 50) size = 50;

        Pageable pageable = PageRequest.of(page, size);

        Page<Product> productPage = productRepository.findAll(pageable);

        return productPage.map(ProductMapper::toResponse);
    }
    @Override
    public Page<ProductResponseDto> getFilteredProducts(
            ProductFilterDto filter,
            int page,
            int size,
            String sortBy,
            String direction
    ) {

        if (page < 0) page = 0;
        if (size > 50) size = 50;

        // Validate price range
        if (filter.getMinPrice() != null && filter.getMaxPrice() != null) {
            if (filter.getMinPrice().compareTo(filter.getMaxPrice()) > 0) {
                throw new BadRequestException("minPrice cannot be greater than maxPrice");
            }
        }
        
        log.info("fetching products with filter : category={} , minPrice={},maxPrice{}",
        		filter.getCategory(), filter.getMinPrice(),filter.getMaxPrice()
        		);

        if (sortBy != null && 
        	    !sortBy.equals("price") && 
        	    !sortBy.equals("name")) {
        	log.info("sorting by {} iin {} direction",sortBy,direction);
        	    throw new BadRequestException("Invalid sort field");
        	}
        
        if (sortBy == null) {
            sortBy = "id"; // default safe
        }

        // Direction control
        Sort sort = direction != null && direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        var spec = ProductSpecification.filterBy(
                filter.getCategory(),
                filter.getMinPrice(),
                filter.getMaxPrice()
        );

        Page<Product> productPage = productRepository.findAll(spec, pageable);

        return productPage.map(ProductMapper::toResponse);
    }
    
    }
