package com.cnib.dogboarding.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

/**
 * Entity representing an approved boarding assignment.
 * Links a boarding request to a specific boarder, approved by a coordinator.
 * One-to-one relationship with BoardingRequest.
 */
@Entity
@Table(name = "boarding_assignments")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BoardingAssignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "boarding_request_id", nullable = false, unique = true)
    private BoardingRequest boardingRequest;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "boarder_id", nullable = false)
    private User boarder;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "coordinator_id", nullable = false)
    private User coordinator;

    @Column(name = "approved_at")
    private LocalDateTime approvedAt;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Relationships
    @OneToOne(mappedBy = "assignment", cascade = CascadeType.ALL)
    private BoardingFeedback feedback;
}
