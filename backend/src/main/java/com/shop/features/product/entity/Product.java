package com.shop.features.product.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "products")
@Getter
@Setter
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //  Name: required, limited length
    @Column(nullable = false, length = 100)
    private String name;

    //  Description: large but controlled
    @Column(nullable = false, length = 1000)
    private String description;

    // Price: precise
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    // Category (later we convert to relation)
    @Column(length = 50)
    private String category;

    @Column(length = 30)
    private String color;

    @Column(length = 20)
    private String size;

    //  Stock count
    @Column(nullable = false)
    private Integer stock;

    //  Audit fields
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    //Lifecycle hooks
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}