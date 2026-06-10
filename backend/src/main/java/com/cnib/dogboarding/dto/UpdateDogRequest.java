package com.cnib.dogboarding.dto;

import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for updating dog profile information.
 * All fields are optional - only provided fields will be updated.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateDogRequest {

    private String name;

    private String breed;

    @Min(value = 0, message = "Age must be positive")
    private Integer age;

    private String medicalInfo;

    private String foodType;

    private String profilePictureUrl;
}
