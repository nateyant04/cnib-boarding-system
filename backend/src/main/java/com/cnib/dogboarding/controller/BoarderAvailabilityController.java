package com.cnib.dogboarding.controller;

import com.cnib.dogboarding.dto.AvailabilityDTO;
import com.cnib.dogboarding.dto.CreateAvailabilityRequest;
import com.cnib.dogboarding.dto.UpdateAvailabilityRequest;
import com.cnib.dogboarding.service.BoarderAvailabilityService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/availability")
@RequiredArgsConstructor
public class BoarderAvailabilityController {

    private final BoarderAvailabilityService availabilityService;

    /**
     * Create a new availability window
     * POST /api/availability
     */
    @PostMapping
    public ResponseEntity<AvailabilityDTO> createAvailability(
            @Valid @RequestBody CreateAvailabilityRequest request) {
        AvailabilityDTO created = availabilityService.createAvailability(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    /**
     * Get all availability windows for a boarder
     * GET /api/availability/boarder/{boarderId}
     */
    @GetMapping("/boarder/{boarderId}")
    public ResponseEntity<List<AvailabilityDTO>> getAvailabilityByBoarder(
            @PathVariable Long boarderId) {
        return ResponseEntity.ok(availabilityService.getAvailabilityByBoarder(boarderId));
    }

    /**
     * Get a specific availability window by ID
     * GET /api/availability/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<AvailabilityDTO> getAvailabilityById(@PathVariable Long id) {
        return ResponseEntity.ok(availabilityService.getAvailabilityById(id));
    }

    /**
     * Find all available boarders for a date range
     * GET /api/availability/search?start=2024-01-01&end=2024-01-07
     */
    @GetMapping("/search")
    public ResponseEntity<List<AvailabilityDTO>> getAvailableBoarders(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {
        return ResponseEntity.ok(availabilityService.getAvailableBoardersForDateRange(start, end));
    }

    /**
     * Update an availability window
     * PUT /api/availability/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<AvailabilityDTO> updateAvailability(
            @PathVariable Long id,
            @Valid @RequestBody UpdateAvailabilityRequest request) {
        return ResponseEntity.ok(availabilityService.updateAvailability(id, request));
    }

    /**
     * Delete an availability window
     * DELETE /api/availability/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAvailability(@PathVariable Long id) {
        availabilityService.deleteAvailability(id);
        return ResponseEntity.noContent().build();
    }
}
