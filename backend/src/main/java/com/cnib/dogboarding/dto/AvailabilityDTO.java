package com.cnib.dogboarding.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AvailabilityDTO {
    private Long id;
    private Long boarderId;
    private String boarderName;
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer capacity;
    private String notes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
