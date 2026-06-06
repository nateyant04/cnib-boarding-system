package com.cnib.dogboarding.repository;

import com.cnib.dogboarding.entity.BoardingRequest;
import com.cnib.dogboarding.entity.RequestStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

/**
 * Repository interface for BoardingRequest database operations.
 * Includes queries for finding requests by status, dog, puppy raiser,
 * and detecting overlapping requests for the same dog.
 */
@Repository
public interface BoardingRequestRepository extends JpaRepository<BoardingRequest, Long> {

    List<BoardingRequest> findByStatus(RequestStatus status);

    List<BoardingRequest> findByDogId(Long dogId);

    List<BoardingRequest> findByPuppyRaiserId(Long puppyRaiserId);

    @Query("SELECT br FROM BoardingRequest br WHERE br.dog.puppyRaiser.id = :raiserId " +
           "ORDER BY br.createdAt DESC")
    List<BoardingRequest> findByPuppyRaiserIdOrderByCreatedAtDesc(@Param("raiserId") Long raiserId);

    @Query("SELECT br FROM BoardingRequest br WHERE br.status = :status " +
           "ORDER BY br.createdAt ASC")
    List<BoardingRequest> findByStatusOrderByCreatedAtAsc(@Param("status") RequestStatus status);

    // Check for overlapping boarding requests for the same dog
    @Query("SELECT br FROM BoardingRequest br WHERE br.dog.id = :dogId " +
           "AND br.status IN ('PENDING', 'APPROVED') " +
           "AND ((br.startDate <= :endDate AND br.endDate >= :startDate))")
    List<BoardingRequest> findOverlappingRequestsForDog(
        @Param("dogId") Long dogId,
        @Param("startDate") LocalDate startDate,
        @Param("endDate") LocalDate endDate
    );

    // Get all boarding requests within a date range
    @Query("SELECT br FROM BoardingRequest br " +
           "WHERE br.startDate <= :endDate AND br.endDate >= :startDate " +
           "ORDER BY br.startDate ASC")
    List<BoardingRequest> findRequestsInDateRange(
        @Param("startDate") LocalDate startDate,
        @Param("endDate") LocalDate endDate
    );
}
