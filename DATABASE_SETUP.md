# Database Setup Guide

## Step 1: Install PostgreSQL

### Windows Installation:
1. Download PostgreSQL from: https://www.postgresql.org/download/windows/
2. Run the installer
3. **Important**: Remember the password you set for the `postgres` user!
4. Keep default port: `5432`
5. Install pgAdmin 4 (GUI tool)

### Verify Installation:
Open Command Prompt or PowerShell:
```bash
psql --version
```
You should see something like: `psql (PostgreSQL) 15.x`

---

## Step 2: Create Database

### Option A - Using pgAdmin (Recommended for Beginners):
1. Open **pgAdmin 4**
2. Connect to PostgreSQL (enter your password)
3. Right-click "Databases" → "Create" → "Database"
4. Database name: `dogboarding`
5. Click "Save"

### Option B - Using Command Line:
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE dogboarding;

# List databases to verify
\l

# Exit
\q
```

---

## Step 3: Configure Your Application

1. **Edit the `.env` file** in the `backend` folder
2. **Replace `YOUR_PASSWORD_HERE`** with your actual PostgreSQL password
3. Save the file

Example:
```
DB_PASSWORD=mySecretPassword123
```

---

## Step 4: Run Your Spring Boot Application

### Option A - Using IntelliJ IDEA:
1. Open the `backend` folder as a project in IntelliJ
2. Wait for Maven to download dependencies
3. Find `DogBoardingApplication.java`
4. Click the green ▶️ play button next to the main method
5. Check the console for "Started DogBoardingApplication"

### Option B - Using Command Line:
```bash
cd backend
mvnw.cmd spring-boot:run    # Windows
```

---

## Step 5: Verify Database Tables

### Using pgAdmin:
1. Open pgAdmin 4
2. Navigate to: Databases → dogboarding → Schemas → public → Tables
3. You should see 6 tables:
   - users
   - dogs
   - boarder_availability
   - boarding_requests
   - boarding_assignments
   - boarding_feedback

### Using Command Line:
```bash
psql -U postgres -d dogboarding

# List all tables
\dt

# Describe users table
\d users

# Exit
\q
```

---

## Common Issues

### Issue: "password authentication failed"
**Solution**: Check your password in the `.env` file matches your PostgreSQL password

### Issue: "database does not exist"
**Solution**: Make sure you created the `dogboarding` database in Step 2

### Issue: "port 5432 is already in use"
**Solution**: PostgreSQL is already running, this is fine! Just continue.

### Issue: "Flyway migration failed"
**Solution**:
1. Drop the database: `DROP DATABASE dogboarding;`
2. Recreate it: `CREATE DATABASE dogboarding;`
3. Restart your Spring Boot application

---

## Next Steps

Once your application starts successfully:
1. The database tables will be automatically created by Flyway
2. You can start testing your API endpoints
3. Use Postman or Thunder Client to make API requests
4. Your API will be running at: http://localhost:8080

---

## Useful PostgreSQL Commands

```sql
-- Connect to database
\c dogboarding

-- List all tables
\dt

-- See table structure
\d users

-- View all users
SELECT * FROM users;

-- Count records in a table
SELECT COUNT(*) FROM users;

-- Exit psql
\q
```
