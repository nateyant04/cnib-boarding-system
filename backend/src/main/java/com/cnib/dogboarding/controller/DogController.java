package com.cnib.dogboarding.controller;

import com.cnib.dogboarding.dto.CreateDogRequest;
import com.cnib.dogboarding.dto.DogDTO;
import com.cnib.dogboarding.dto.UpdateDogRequest;
import com.cnib.dogboarding.service.DogService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for dog management endpoints.
 * Provides CRUD operations for dog profiles at /api/dogs.
 */
@RestController
@RequestMapping("/api/dogs")
@RequiredArgsConstructor
public class DogController {

    private final DogService dogService;

    /**
     * Create a new dog profile
     * POST /api/dogs
     */
    @PostMapping
    public ResponseEntity<DogDTO> createDog(@Valid @RequestBody CreateDogRequest request) {
        DogDTO createdDog = dogService.createDog(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdDog);
    }

    /**
     * Get all dogs
     * GET /api/dogs
     */
    @GetMapping
    public ResponseEntity<List<DogDTO>> getAllDogs() {
        List<DogDTO> dogs = dogService.getAllDogs();
        return ResponseEntity.ok(dogs);
    }

    /**
     * Get dog by ID
     * GET /api/dogs/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<DogDTO> getDogById(@PathVariable Long id) {
        DogDTO dog = dogService.getDogById(id);
        return ResponseEntity.ok(dog);
    }

    /**
     * Get dogs by puppy raiser ID
     * GET /api/dogs/puppy-raiser/{puppyRaiserId}
     */
    @GetMapping("/puppy-raiser/{puppyRaiserId}")
    public ResponseEntity<List<DogDTO>> getDogsByPuppyRaiser(@PathVariable Long puppyRaiserId) {
        List<DogDTO> dogs = dogService.getDogsByPuppyRaiserId(puppyRaiserId);
        return ResponseEntity.ok(dogs);
    }

    /**
     * Search dogs by name
     * GET /api/dogs/search?name={name}
     */
    @GetMapping("/search")
    public ResponseEntity<List<DogDTO>> searchDogsByName(@RequestParam String name) {
        List<DogDTO> dogs = dogService.searchDogsByName(name);
        return ResponseEntity.ok(dogs);
    }

    /**
     * Update dog profile
     * PUT /api/dogs/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<DogDTO> updateDog(
            @PathVariable Long id,
            @Valid @RequestBody UpdateDogRequest request) {
        DogDTO updatedDog = dogService.updateDog(id, request);
        return ResponseEntity.ok(updatedDog);
    }

    /**
     * Delete dog
     * DELETE /api/dogs/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDog(@PathVariable Long id) {
        dogService.deleteDog(id);
        return ResponseEntity.noContent().build();
    }
}
