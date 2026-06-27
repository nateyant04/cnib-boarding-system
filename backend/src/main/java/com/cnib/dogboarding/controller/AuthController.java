package com.cnib.dogboarding.controller;

import com.cnib.dogboarding.dto.LoginRequest;
import com.cnib.dogboarding.dto.LoginResponse;
import com.cnib.dogboarding.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for authentication endpoints.
 * Handles user login and authentication.
 */
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    /**
     * Login endpoint.
     * Authenticates user credentials and returns a token with user information.
     * 
     * @param loginRequest the login credentials (email and password)
     * @return ResponseEntity containing LoginResponse with token and user details
     */
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        LoginResponse response = authService.login(loginRequest);
        return ResponseEntity.ok(response);
    }
}
