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
 * Entity representing a service dog in training.
 * Belongs to a puppy raiser and contains profile information including
 * medical info, dietary restrictions, and boarding history.
 */
@Entity
@Table(name = "dogs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Dog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String breed;

    private Integer age;

    @Column(name = "medical_info", columnDefinition = "TEXT")
    private String medicalInfo;

    @Column(name = "dietary_restrictions", columnDefinition = "TEXT")
    private String dietaryRestrictions;

    @Column(name = "profile_picture_url")
    private String profilePictureUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "puppy_raiser_id", nullable = false)
    private User puppyRaiser;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Relationships
    @OneToMany(mappedBy = "dog", cascade = CascadeType.ALL)
    @Builder.Default
    private List<BoardingRequest> boardingRequests = new ArrayList<>();
}
