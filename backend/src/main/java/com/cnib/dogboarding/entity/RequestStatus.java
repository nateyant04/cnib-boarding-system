package com.cnib.dogboarding.entity;

/**
 * Enum representing the lifecycle status of a boarding request.
 * Tracks the request from submission through completion.
 */
public enum RequestStatus {
    PENDING,
    APPROVED,
    REJECTED,
    COMPLETED,
    CANCELLED
}
