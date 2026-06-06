# Dog Boarding Management System

A full-stack web application for managing service dog boarding logistics for a non-profit dog training organization.

## Project Overview

This system helps coordinate boarding arrangements when service dog trainers go on vacation. It manages four types of users (boarders, puppy raisers, trainers, and coordinators) and facilitates the entire boarding workflow from request submission to feedback.

## Features

### User Management
- **Four user roles:** Boarders, Puppy Raisers, Trainers, and Coordinators
- Role-based access control with different permissions for each user type
- Secure authentication with JWT tokens and BCrypt password encryption

### Boarding Workflow
- **Puppy raisers** create and manage dog profiles
- **Puppy raisers** submit boarding requests with date ranges
- **Boarders** set their availability and capacity
- **Coordinators** review requests and match them with available boarders
- **Boarders** provide feedback after boarding
- **Trainers** view complete boarding history and feedback

### Automated Matching
- System suggests available boarders based on date ranges and capacity
- Prevents double-booking of dogs
- Tracks boarder capacity during overlapping periods

### Email Notifications
- Notifications for new boarding requests
- Alerts when requests are approved/rejected
- Reminders for feedback submission
- Updates when dog profiles are modified

## Tech Stack

### Backend
- **Java 17**
- **Spring Boot 3.2** - Application framework
- **Spring Security** - Authentication & authorization
- **Spring Data JPA** - Database ORM
- **Hibernate** - JPA implementation
- **PostgreSQL** - Relational database
- **Flyway** - Database migrations
- **Maven** - Build & dependency management
- **JWT (jjwt)** - Token-based authentication
- **Spring Mail** - Email notifications
- **Lombok** - Reduce boilerplate code

### Frontend (Planned)
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **TanStack Query** - Server state management
- **Tailwind CSS** - Styling

### Database Schema
- **users** - User accounts with roles
- **dogs** - Service dog profiles
- **boarder_availability** - Boarder availability periods
- **boarding_requests** - Boarding request submissions
- **boarding_assignments** - Approved boarding assignments
- **boarding_feedback** - Post-boarding feedback

## Getting Started

### Prerequisites
- **Java 17** or higher
- **PostgreSQL 15+**
- **Maven 3.6+** (or use included Maven wrapper)
- **Node.js 18+** (for frontend, when available)

### Database Setup

1. Install PostgreSQL
2. Create database:
```sql
CREATE DATABASE dogboarding;
```

3. Configure database connection:
   - Copy `backend/.env.example` to `backend/.env`
   - Update with your PostgreSQL credentials

### Running the Backend

1. Navigate to backend directory:
```bash
cd backend
```

2. Run with Maven wrapper (Windows):
```bash
.\mvnw.cmd spring-boot:run
```

Or on Mac/Linux:
```bash
./mvnw spring-boot:run
```

3. Application will start on: `http://localhost:8080`

### API Documentation

See `POSTMAN_TESTING_GUIDE.md` for detailed API endpoint documentation and testing instructions.

#### User Endpoints
- `POST /api/users` - Create new user
- `GET /api/users` - Get all users
- `GET /api/users/{id}` - Get user by ID
- `GET /api/users/role/{role}` - Get users by role
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

## Project Structure

```
CNIB_Planning/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/cnib/dogboarding/
│   │   │   │   ├── config/         # Security & app configuration
│   │   │   │   ├── controller/     # REST API endpoints
│   │   │   │   ├── dto/            # Data Transfer Objects
│   │   │   │   ├── entity/         # JPA entities (database models)
│   │   │   │   ├── exception/      # Custom exceptions & error handling
│   │   │   │   ├── repository/     # Database query interfaces
│   │   │   │   ├── service/        # Business logic layer
│   │   │   │   └── DogBoardingApplication.java
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       └── db/migration/   # Flyway database migrations
│   │   └── test/                   # Unit & integration tests
│   ├── pom.xml                     # Maven dependencies
│   └── .env.example                # Environment variable template
├── frontend/                       # React frontend (coming soon)
├── DATABASE_SETUP.md               # Database setup guide
├── POSTMAN_TESTING_GUIDE.md        # API testing guide
└── README.md                       # This file
```

## Development Status

### ✅ Completed
- [x] Database schema design with Flyway migrations
- [x] JPA entity models with relationships
- [x] Repository layer with custom queries
- [x] User service with CRUD operations
- [x] User REST API endpoints
- [x] Spring Security configuration
- [x] Global exception handling
- [x] Password encryption with BCrypt
- [x] Input validation
- [x] PostgreSQL database integration

### 🚧 In Progress
- [ ] Dog management endpoints
- [ ] Boarding request workflow
- [ ] Boarder availability management
- [ ] Automated boarder matching algorithm
- [ ] Email notification system

### 📋 Planned
- [ ] Frontend React application
- [ ] User authentication & JWT integration
- [ ] Role-based UI dashboards
- [ ] Calendar components for date selection
- [ ] Feedback submission forms
- [ ] Unit & integration tests
- [ ] Deployment (Railway/Render + Vercel)

## Learning Objectives

This project serves as a comprehensive learning experience covering:
- **Backend development** with Spring Boot
- **RESTful API** design principles
- **Database design** and migrations
- **Authentication & authorization** patterns
- **Full-stack integration** (backend + frontend)
- **Professional development workflows** (Git, testing, deployment)

## Author

Built by a 3rd-year Computer Science student as a portfolio project demonstrating full-stack development skills.

## License

This project is for educational and portfolio purposes.

## Acknowledgments

- Service dog training organization for the use case and requirements
- Spring Boot and React communities for excellent documentation
