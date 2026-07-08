package com.cnib.dogboarding.dto;

import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateAvailabilityRequest {

    private LocalDate startDate;

    private LocalDate endDate;

    @Min(value = 1, message = "Capacity must be at least 1")
    private Integer capacity;

    private String notes;
}
