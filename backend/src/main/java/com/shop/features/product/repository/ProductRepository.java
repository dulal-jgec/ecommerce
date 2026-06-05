package com.shop.features.product.repository;

import com.shop.features.product.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ProductRepository extends JpaRepository<Product, Long>,JpaSpecificationExecutor<Product> {
	
}