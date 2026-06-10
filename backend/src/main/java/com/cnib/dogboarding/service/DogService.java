package com.cnib.dogboarding.service;

import com.cnib.dogboarding.dto.CreateDogRequest;
import com.cnib.dogboarding.dto.DogDTO;
import com.cnib.dogboarding.dto.UpdateDogRequest;
import com.cnib.dogboarding.entity.Dog;
import com.cnib.dogboarding.entity.User;
import com.cnib.dogboarding.exception.ResourceNotFoundException;
import com.cnib.dogboarding.repository.DogRepository;
import com.cnib.dogboarding.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service containing business logic for dog management.
 * Handles CRUD operations for dog profiles and puppy raiser associations.
 */
@Service
@RequiredArgsConstructor
@Transactional
public class DogService {

    private final DogRepository dogRepository;
    private final UserRepository userRepository;

    /**
     * Create a new dog profile
     */
    public DogDTO createDog(CreateDogRequest request) {
        // Verify puppy raiser exists
        User puppyRaiser = userRepository.findById(request.getPuppyRaiserId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Puppy raiser not found with id: " + request.getPuppyRaiserId()));

        // Create dog entity
        Dog dog = Dog.builder()
                .name(request.getName())
                .breed(request.getBreed())
                .age(request.getAge())
                .medicalInfo(request.getMedicalInfo())
                .foodType(request.getFoodType())
                .profilePictureUrl(request.getProfilePictureUrl())
                .puppyRaiser(puppyRaiser)
                .build();

        Dog savedDog = dogRepository.save(dog);
        return mapToDTO(savedDog);
    }

    /**
     * Get dog by ID
     */
    @Transactional(readOnly = true)
    public DogDTO getDogById(Long id) {
        Dog dog = dogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Dog not found with id: " + id));
        return mapToDTO(dog);
    }

    /**
     * Get all dogs
     */
    @Transactional(readOnly = true)
    public List<DogDTO> getAllDogs() {
        return dogRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Get dogs by puppy raiser ID
     */
    @Transactional(readOnly = true)
    public List<DogDTO> getDogsByPuppyRaiserId(Long puppyRaiserId) {
        // Verify puppy raiser exists
        if (!userRepository.existsById(puppyRaiserId)) {
            throw new ResourceNotFoundException("Puppy raiser not found with id: " + puppyRaiserId);
        }

        return dogRepository.findByPuppyRaiserId(puppyRaiserId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Search dogs by name
     */
    @Transactional(readOnly = true)
    public List<DogDTO> searchDogsByName(String name) {
        return dogRepository.searchByName(name).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Update dog profile
     */
    public DogDTO updateDog(Long id, UpdateDogRequest request) {
        Dog dog = dogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Dog not found with id: " + id));

        // Update fields if provided
        if (request.getName() != null) {
            dog.setName(request.getName());
        }
        if (request.getBreed() != null) {
            dog.setBreed(request.getBreed());
        }
        if (request.getAge() != null) {
            dog.setAge(request.getAge());
        }
        if (request.getMedicalInfo() != null) {
            dog.setMedicalInfo(request.getMedicalInfo());
        }
        if (request.getFoodType() != null) {
            dog.setFoodType(request.getFoodType());
        }
        if (request.getProfilePictureUrl() != null) {
            dog.setProfilePictureUrl(request.getProfilePictureUrl());
        }

        Dog updatedDog = dogRepository.save(dog);
        return mapToDTO(updatedDog);
    }

    /**
     * Delete dog
     */
    public void deleteDog(Long id) {
        if (!dogRepository.existsById(id)) {
            throw new ResourceNotFoundException("Dog not found with id: " + id);
        }
        dogRepository.deleteById(id);
    }

    /**
     * Map Dog entity to DogDTO
     */
    private DogDTO mapToDTO(Dog dog) {
        return DogDTO.builder()
                .id(dog.getId())
                .name(dog.getName())
                .breed(dog.getBreed())
                .age(dog.getAge())
                .medicalInfo(dog.getMedicalInfo())
                .foodType(dog.getFoodType())
                .profilePictureUrl(dog.getProfilePictureUrl())
                .puppyRaiserId(dog.getPuppyRaiser().getId())
                .puppyRaiserName(dog.getPuppyRaiser().getName())
                .createdAt(dog.getCreatedAt())
                .updatedAt(dog.getUpdatedAt())
                .build();
    }
}
