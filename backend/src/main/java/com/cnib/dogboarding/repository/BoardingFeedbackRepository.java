package com.cnib.dogboarding.repository;

import com.cnib.dogboarding.entity.BoardingFeedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for handling database operations related to boarding feedback.
 * Includes custom queries for rating calculations and feedback retrieval.
 */
@Repository
public interface BoardingFeedbackRepository extends JpaRepository<BoardingFeedback, Long> {

    Optional<BoardingFeedback> findByAssignmentId(Long assignmentId);

    List<BoardingFeedback> findByBoarderId(Long boarderId);

    @Query("SELECT bf FROM BoardingFeedback bf " +
           "WHERE bf.assignment.boardingRequest.dog.id = :dogId " +
           "ORDER BY bf.submittedAt DESC")
    List<BoardingFeedback> findByDogIdOrderBySubmittedAtDesc(@Param("dogId") Long dogId);

    @Query("SELECT bf FROM BoardingFeedback bf " +
           "WHERE bf.boarder.id = :boarderId " +
           "ORDER BY bf.submittedAt DESC")
    List<BoardingFeedback> findByBoarderIdOrderBySubmittedAtDesc(@Param("boarderId") Long boarderId);

    @Query("SELECT AVG(bf.rating) FROM BoardingFeedback bf " +
           "WHERE bf.boarder.id = :boarderId AND bf.rating IS NOT NULL")
    Double getAverageRatingForBoarder(@Param("boarderId") Long boarderId);
}
