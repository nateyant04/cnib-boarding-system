package com.cnib.dogboarding.repository;

import com.cnib.dogboarding.entity.BoardingAssignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * Repository interface for handling database operations related to boarding assignments.
 */
@Repository
public interface BoardingAssignmentRepository extends JpaRepository<BoardingAssignment, Long> {

    Optional<BoardingAssignment> findByBoardingRequestId(Long boardingRequestId);

    List<BoardingAssignment> findByBoarderId(Long boarderId);

    List<BoardingAssignment> findByCoordinatorId(Long coordinatorId);

    @Query("SELECT ba FROM BoardingAssignment ba " +
           "WHERE ba.boarder.id = :boarderId " +
           "ORDER BY ba.approvedAt DESC")
    List<BoardingAssignment> findByBoarderIdOrderByApprovedAtDesc(@Param("boarderId") Long boarderId);

    @Query("SELECT ba FROM BoardingAssignment ba " +
           "WHERE ba.boardingRequest.dog.id = :dogId " +
           "ORDER BY ba.approvedAt DESC")
    List<BoardingAssignment> findByDogIdOrderByApprovedAtDesc(@Param("dogId") Long dogId);

    // Count active assignments for a boarder during a date range
    @Query("SELECT COUNT(ba) FROM BoardingAssignment ba " +
           "WHERE ba.boarder.id = :boarderId " +
           "AND ba.boardingRequest.status = 'APPROVED' " +
           "AND ba.boardingRequest.startDate <= :endDate " +
           "AND ba.boardingRequest.endDate >= :startDate")
    Long countActiveAssignmentsForBoarder(
        @Param("boarderId") Long boarderId,
        @Param("startDate") LocalDate startDate,
        @Param("endDate") LocalDate endDate
    );
}
