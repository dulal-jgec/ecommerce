package com.shop.features.user.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //unique email (login identity)
    @Column(nullable = false, unique = true, length = 100)
    private String email;

    //hashed password (never plain text)
    @Column(nullable = false)
    private String password;

    //role for authorization
    @Column(nullable = false)
    private String role; // USER / ADMIN

    //audit
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    public void onCreate() {
        createdAt = LocalDateTime.now();
    }
}