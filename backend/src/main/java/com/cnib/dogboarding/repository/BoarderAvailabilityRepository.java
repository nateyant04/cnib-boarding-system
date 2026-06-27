package com.cnib.dogboarding.repository;

import com.cnib.dogboarding.entity.BoarderAvailability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

/**
 * Repository interface for BoarderAvailability database operations.
 * Includes queries for finding available boarders within date ranges.
 */
@Repository
public interface BoarderAvailabilityRepository extends JpaRepository<BoarderAvailability, Long> {

    List<BoarderAvailability> findByBoarderId(Long boarderId);

    @Query("SELECT ba FROM BoarderAvailability ba WHERE ba.boarder.id = :boarderId " +
           "AND ((ba.startDate <= :endDate AND ba.endDate >= :startDate))")
    List<BoarderAvailability> findOverlappingAvailability(
        @Param("boarderId") Long boarderId,
        @Param("startDate") LocalDate startDate,
        @Param("endDate") LocalDate endDate
    );

    @Query("SELECT ba FROM BoarderAvailability ba " +
           "WHERE ba.startDate <= :endDate AND ba.endDate >= :startDate " +
           "ORDER BY ba.boarder.lastName ASC, ba.boarder.firstName ASC")
    List<BoarderAvailability> findAvailableBoardersForDateRange(
        @Param("startDate") LocalDate startDate,
        @Param("endDate") LocalDate endDate
    );
}
