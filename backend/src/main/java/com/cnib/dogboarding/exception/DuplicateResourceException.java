package com.cnib.dogboarding.exception;

/**
 * Exception thrown when attempting to create a resource that already exists.
 * Commonly used for duplicate email addresses or other unique constraint violations.
 */
public class DuplicateResourceException extends RuntimeException {
    public DuplicateResourceException(String message) {
        super(message);
    }
}
