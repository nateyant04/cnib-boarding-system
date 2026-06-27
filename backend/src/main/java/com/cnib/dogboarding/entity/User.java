package com.cnib.dogboarding.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Entity representing a user in the system.
 * Can be a boarder, puppy raiser, trainer, or coordinator.
 * Stores authentication info and relationships to dogs and availability.
 */
@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    private String phone;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Relationships
    @OneToMany(mappedBy = "puppyRaiser", cascade = CascadeType.ALL)
    @Builder.Default
    private List<Dog> dogs = new ArrayList<>();

    @OneToMany(mappedBy = "boarder", cascade = CascadeType.ALL)
    @Builder.Default
    private List<BoarderAvailability> availabilities = new ArrayList<>();

    @OneToMany(mappedBy = "puppyRaiser")
    @Builder.Default
    private List<BoardingRequest> boardingRequests = new ArrayList<>();

    // Convenience method to get password (alias for passwordHash)
    public String getPassword() {
        return passwordHash;
    }
    
    public void setPassword(String password) {
        this.passwordHash = password;
    }
}
