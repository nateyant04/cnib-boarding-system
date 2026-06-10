package com.cnib.dogboarding.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for creating a new dog profile.
 * Used by puppy raisers to register their dogs.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateDogRequest {

    @NotBlank(message = "Dog name is required")
    private String name;

    private String breed;

    @Min(value = 0, message = "Age must be positive")
    private Integer age;

    private String medicalInfo;

    private String foodType;

    private String profilePictureUrl;

    @NotNull(message = "Puppy raiser ID is required")
    private Long puppyRaiserId;
}
