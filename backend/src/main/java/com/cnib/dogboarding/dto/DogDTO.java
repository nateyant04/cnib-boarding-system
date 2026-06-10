package com.cnib.dogboarding.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * DTO for Dog responses.
 * Includes basic dog information and puppy raiser details.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DogDTO {
    private Long id;
    private String name;
    private String breed;
    private Integer age;
    private String medicalInfo;
    private String foodType;
    private String profilePictureUrl;
    private Long puppyRaiserId;
    private String puppyRaiserName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
