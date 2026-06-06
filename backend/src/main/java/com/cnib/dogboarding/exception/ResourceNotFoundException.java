package com.cnib.dogboarding.exception;

/**
 * Exception thrown when a requested resource does not exist in the system.
 */
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
