package com.cnib.dogboarding.service;

import com.cnib.dogboarding.dto.LoginRequest;
import com.cnib.dogboarding.dto.LoginResponse;
import com.cnib.dogboarding.entity.User;
import com.cnib.dogboarding.exception.AuthenticationException;
import com.cnib.dogboarding.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Service for handling authentication operations.
 * Manages user login and token generation.
 */
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    /**
     * Authenticates a user and returns a login response with user details.
     * 
     * @param loginRequest the login credentials
     * @return LoginResponse containing user information
     * @throws AuthenticationException if credentials are invalid
     */
    public LoginResponse login(LoginRequest loginRequest) {
        // Find user by email
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new AuthenticationException("Invalid email or password"));

        // Verify password
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new AuthenticationException("Invalid email or password");
        }

        // For now, we'll use a simple token (user's email)
        // In a real application, you would generate a JWT token here
        String token = "Bearer_" + user.getEmail();

        return LoginResponse.builder()
                .token(token)
                .userId(user.getId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .role(user.getRole())
                .build();
    }
}
