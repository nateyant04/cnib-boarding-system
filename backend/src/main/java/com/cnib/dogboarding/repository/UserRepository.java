package com.cnib.dogboarding.repository;

import com.cnib.dogboarding.entity.User;
import com.cnib.dogboarding.entity.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for User database operations.
 * Provides CRUD operations and custom queries for finding users by email and role.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    List<User> findByRole(UserRole role);

    List<User> findByRoleIn(List<UserRole> roles);
}
