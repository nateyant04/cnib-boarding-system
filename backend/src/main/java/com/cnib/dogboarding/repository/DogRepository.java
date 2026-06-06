package com.cnib.dogboarding.repository;

import com.cnib.dogboarding.entity.Dog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for Dog database operations.
 * Provides queries for finding dogs by puppy raiser and searching by name.
 */
@Repository
public interface DogRepository extends JpaRepository<Dog, Long> {

    List<Dog> findByPuppyRaiserId(Long puppyRaiserId);

    @Query("SELECT d FROM Dog d WHERE LOWER(d.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<Dog> searchByName(@Param("name") String name);

    @Query("SELECT d FROM Dog d WHERE d.puppyRaiser.id = :raiserId ORDER BY d.name ASC")
    List<Dog> findByPuppyRaiserIdOrderByName(@Param("raiserId") Long raiserId);
}
