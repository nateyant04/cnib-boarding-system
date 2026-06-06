package com.cnib.dogboarding;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

/**
 * Main application class for the Dog Boarding Management System.
 * This is the entry point of the Spring Boot application.
 * Enables asynchronous processing for email notifications.
 */
@SpringBootApplication
@EnableAsync
public class DogBoardingApplication {
    public static void main(String[] args) {
        SpringApplication.run(DogBoardingApplication.class, args);
    }
}
