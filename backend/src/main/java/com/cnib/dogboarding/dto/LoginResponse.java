package com.cnib.dogboarding.dto;

import com.cnib.dogboarding.entity.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for login response.
 * Contains JWT token and user information.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
    
    private String token;
    private Long userId;
    private String email;
    private String firstName;
    private String lastName;
    private UserRole role;
}
