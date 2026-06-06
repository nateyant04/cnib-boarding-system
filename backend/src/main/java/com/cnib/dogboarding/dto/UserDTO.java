package com.cnib.dogboarding.dto;

import com.cnib.dogboarding.entity.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Data Transfer Object representing user data returned from the API.
 * Excludes sensitive information such as password for secure data transmission.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {
    private Long id;
    private String email;
    private String name;
    private String phone;
    private UserRole role;
    private LocalDateTime createdAt;
}
