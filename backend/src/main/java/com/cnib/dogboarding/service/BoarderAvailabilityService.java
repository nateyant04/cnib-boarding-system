package com.cnib.dogboarding.service;

import com.cnib.dogboarding.dto.AvailabilityDTO;
import com.cnib.dogboarding.dto.CreateAvailabilityRequest;
import com.cnib.dogboarding.dto.UpdateAvailabilityRequest;
import com.cnib.dogboarding.entity.BoarderAvailability;
import com.cnib.dogboarding.entity.User;
import com.cnib.dogboarding.exception.ResourceNotFoundException;
import com.cnib.dogboarding.repository.BoarderAvailabilityRepository;
import com.cnib.dogboarding.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class BoarderAvailabilityService {

    private final BoarderAvailabilityRepository availabilityRepository;
    private final UserRepository userRepository;

    public AvailabilityDTO createAvailability(CreateAvailabilityRequest request) {
        User boarder = userRepository.findById(request.getBoarderId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Boarder not found with id: " + request.getBoarderId()));

        validateDateRange(request.getStartDate(), request.getEndDate());

        List<BoarderAvailability> overlaps = availabilityRepository.findOverlappingAvailability(
                request.getBoarderId(), request.getStartDate(), request.getEndDate());
        if (!overlaps.isEmpty()) {
            throw new IllegalArgumentException(
                    "Availability window overlaps with an existing window");
        }

        BoarderAvailability availability = BoarderAvailability.builder()
                .boarder(boarder)
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .capacity(request.getCapacity() != null ? request.getCapacity() : 1)
                .notes(request.getNotes())
                .build();

        return mapToDTO(availabilityRepository.save(availability));
    }

    @Transactional(readOnly = true)
    public List<AvailabilityDTO> getAvailabilityByBoarder(Long boarderId) {
        if (!userRepository.existsById(boarderId)) {
            throw new ResourceNotFoundException("Boarder not found with id: " + boarderId);
        }
        return availabilityRepository.findByBoarderId(boarderId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public AvailabilityDTO getAvailabilityById(Long id) {
        BoarderAvailability availability = availabilityRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Availability not found with id: " + id));
        return mapToDTO(availability);
    }

    @Transactional(readOnly = true)
    public List<AvailabilityDTO> getAvailableBoardersForDateRange(LocalDate startDate, LocalDate endDate) {
        validateDateRange(startDate, endDate);
        return availabilityRepository.findAvailableBoardersForDateRange(startDate, endDate).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public AvailabilityDTO updateAvailability(Long id, UpdateAvailabilityRequest request) {
        BoarderAvailability availability = availabilityRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Availability not found with id: " + id));

        LocalDate newStart = request.getStartDate() != null ? request.getStartDate() : availability.getStartDate();
        LocalDate newEnd = request.getEndDate() != null ? request.getEndDate() : availability.getEndDate();

        validateDateRange(newStart, newEnd);

        List<BoarderAvailability> overlaps = availabilityRepository.findOverlappingAvailability(
                availability.getBoarder().getId(), newStart, newEnd);
        boolean hasConflict = overlaps.stream().anyMatch(o -> !o.getId().equals(id));
        if (hasConflict) {
            throw new IllegalArgumentException(
                    "Updated availability window overlaps with an existing window");
        }

        availability.setStartDate(newStart);
        availability.setEndDate(newEnd);
        if (request.getCapacity() != null) {
            availability.setCapacity(request.getCapacity());
        }
        if (request.getNotes() != null) {
            availability.setNotes(request.getNotes());
        }

        return mapToDTO(availabilityRepository.save(availability));
    }

    public void deleteAvailability(Long id) {
        if (!availabilityRepository.existsById(id)) {
            throw new ResourceNotFoundException("Availability not found with id: " + id);
        }
        availabilityRepository.deleteById(id);
    }

    private void validateDateRange(LocalDate startDate, LocalDate endDate) {
        if (!endDate.isAfter(startDate)) {
            throw new IllegalArgumentException("End date must be after start date");
        }
    }

    private AvailabilityDTO mapToDTO(BoarderAvailability a) {
        return AvailabilityDTO.builder()
                .id(a.getId())
                .boarderId(a.getBoarder().getId())
                .boarderName(a.getBoarder().getFirstName() + " " + a.getBoarder().getLastName())
                .startDate(a.getStartDate())
                .endDate(a.getEndDate())
                .capacity(a.getCapacity())
                .notes(a.getNotes())
                .createdAt(a.getCreatedAt())
                .updatedAt(a.getUpdatedAt())
                .build();
    }
}
