# Postman Testing Guide - Dog Boarding API

## Step 1: Install Postman

1. **Download Postman:** https://www.postman.com/downloads/
2. **Install** the desktop application
3. **Create a free account** (optional but recommended - lets you save your requests)
4. **Open Postman**

---

## Step 2: Create a Collection

1. Click **"Collections"** in the left sidebar
2. Click **"+"** or **"Create Collection"**
3. Name it: **"Dog Boarding API"**
4. Click **"Create"**

---

## Step 3: Start Your Spring Boot Application

Before testing, make sure your backend is running:

```bash
cd "C:\Users\njyan\OneDrive\Desktop\CNIB project\CNIB_Planning\backend"
.\mvnw.cmd spring-boot:run
```

Wait for: `Started DogBoardingApplication in X.XXX seconds`

Your API is now running at: **http://localhost:8080**

---

## Step 4: Create Your First Request

### **Test 1: Create a Boarder User (POST)**

1. **Click** your "Dog Boarding API" collection
2. **Click** "Add request" or the **"..."** menu → "Add request"
3. **Name it:** "Create User - Boarder"

**Configure the request:**
- **Method:** `POST` (dropdown on the left)
- **URL:** `http://localhost:8080/api/users`
- **Headers tab:**
  - Click "Headers"
  - Add: `Content-Type` = `application/json` (usually auto-added)

- **Body tab:**
  - Click "Body"
  - Select **"raw"**
  - Select **"JSON"** from the dropdown (right side)
  - Paste this:

```json
{
  "email": "john.boarder@example.com",
  "password": "password123",
  "name": "John Smith",
  "phone": "555-1234",
  "role": "BOARDER"
}
```

4. **Click "Send"** (big blue button)

**Expected Response (201 Created):**
```json
{
  "id": 1,
  "email": "john.boarder@example.com",
  "name": "John Smith",
  "phone": "555-1234",
  "role": "BOARDER",
  "createdAt": "2026-06-06T..."
}
```

✅ **Success!** You just created your first user!

--- 

### **Test 2: Get All Users (GET)**

1. **Add new request** to your collection
2. **Name:** "Get All Users"
3. **Method:** `GET`
4. **URL:** `http://localhost:8080/api/users`
5. **Click "Send"**

**Expected Response (200 OK):**
```json
[
  {
    "id": 1,
    "email": "john.boarder@example.com",
    "name": "John Smith",
    "phone": "555-1234",
    "role": "BOARDER",
    "createdAt": "2026-06-06T..."
  }
]
```

---

### **Test 3: Get User by ID (GET)**

1. **Add new request:** "Get User by ID"
2. **Method:** `GET`
3. **URL:** `http://localhost:8080/api/users/1`
4. **Click "Send"**

**Expected Response (200 OK):**
```json
{
  "id": 1,
  "email": "john.boarder@example.com",
  "name": "John Smith",
  "phone": "555-1234",
  "role": "BOARDER",
  "createdAt": "2026-06-06T..."
}
```

---

### **Test 4: Update User (PUT)**

1. **Add new request:** "Update User"
2. **Method:** `PUT`
3. **URL:** `http://localhost:8080/api/users/1`
4. **Body (JSON):**

```json
{
  "name": "John Updated Smith",
  "phone": "555-9999"
}
```

5. **Click "Send"**

**Expected Response (200 OK):**
```json
{
  "id": 1,
  "email": "john.boarder@example.com",
  "name": "John Updated Smith",
  "phone": "555-9999",
  "role": "BOARDER",
  "createdAt": "2026-06-06T..."
}
```

---

### **Test 5: Create a Puppy Raiser (POST)**

1. **Add new request:** "Create User - Puppy Raiser"
2. **Method:** `POST`
3. **URL:** `http://localhost:8080/api/users`
4. **Body (JSON):**

```json
{
  "email": "sarah.raiser@example.com",
  "password": "password123",
  "name": "Sarah Johnson",
  "phone": "555-5678",
  "role": "PUPPY_RAISER"
}
```

5. **Click "Send"**

---

### **Test 6: Create a Coordinator (POST)**

1. **Add new request:** "Create User - Coordinator"
2. **Method:** `POST`
3. **URL:** `http://localhost:8080/api/users`
4. **Body (JSON):**

```json
{
  "email": "admin@cnib.com",
  "password": "admin123",
  "name": "Admin Coordinator",
  "phone": "555-0000",
  "role": "COORDINATOR"
}
```

5. **Click "Send"**

---

### **Test 7: Get Users by Role (GET)**

1. **Add new request:** "Get Boarders Only"
2. **Method:** `GET`
3. **URL:** `http://localhost:8080/api/users/role/BOARDER`
4. **Click "Send"**

Should return only users with role "BOARDER"

---

### **Test 8: Delete User (DELETE)**

1. **Add new request:** "Delete User"
2. **Method:** `DELETE`
3. **URL:** `http://localhost:8080/api/users/1`
4. **Click "Send"**

**Expected Response (204 No Content):** Empty response, user deleted

---

## Step 5: Test Error Scenarios

### **Test: Duplicate Email (409 Conflict)**

Try creating a user with an email that already exists:

**Request:** POST `http://localhost:8080/api/users`
```json
{
  "email": "sarah.raiser@example.com",
  "password": "password123",
  "name": "Another Sarah",
  "phone": "555-1111",
  "role": "TRAINER"
}
```

**Expected Response (409 Conflict):**
```json
{
  "status": 409,
  "message": "Email already exists: sarah.raiser@example.com",
  "timestamp": "2026-06-06T..."
}
```

---

### **Test: User Not Found (404 Not Found)**

**Request:** GET `http://localhost:8080/api/users/999`

**Expected Response (404 Not Found):**
```json
{
  "status": 404,
  "message": "User not found with id: 999",
  "timestamp": "2026-06-06T..."
}
```

---

### **Test: Validation Error (400 Bad Request)**

Try creating a user without required fields:

**Request:** POST `http://localhost:8080/api/users`
```json
{
  "email": "invalid-email",
  "password": ""
}
```

**Expected Response (400 Bad Request):**
```json
{
  "status": 400,
  "message": "Validation failed",
  "timestamp": "2026-06-06T...",
  "errors": {
    "email": "Email must be valid",
    "password": "Password is required",
    "name": "Name is required",
    "role": "Role is required"
  }
}
```

---

## Step 6: Verify in Database

After creating users, verify they're saved:

1. **Open pgAdmin 4**
2. Navigate to: **dogboarding → Schemas → public → Tables → users**
3. **Right-click "users"** → **View/Edit Data** → **All Rows**
4. You should see all your created users with encrypted passwords!

---

## Pro Tips

### **1. Use Variables (Advanced)**

In Postman, you can use variables:
- Click the collection → "Variables" tab
- Add variable: `baseUrl` = `http://localhost:8080`
- Use in requests: `{{baseUrl}}/api/users`

### **2. Save Requests**

Always click **"Save"** after creating a request so you can reuse it later!

### **3. Organize with Folders**

Create folders in your collection:
- "User Management"
- "Dog Management" (future)
- "Boarding Requests" (future)

### **4. Add Tests (Optional)**

In the "Tests" tab of each request, you can write automated tests:
```javascript
pm.test("Status code is 201", function () {
    pm.response.to.have.status(201);
});

pm.test("User has an ID", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.id).to.exist;
});
```

---

## Common HTTP Status Codes

| Code | Meaning | When You'll See It |
|------|---------|-------------------|
| 200 | OK | Successful GET, PUT requests |
| 201 | Created | Successful POST (user created) |
| 204 | No Content | Successful DELETE |
| 400 | Bad Request | Validation failed |
| 404 | Not Found | User doesn't exist |
| 409 | Conflict | Duplicate email |
| 500 | Server Error | Something broke in your code |

---

## Quick Test Checklist

✅ Create a boarder user
✅ Create a puppy raiser user
✅ Create a coordinator user
✅ Get all users (should see 3)
✅ Get user by ID
✅ Update a user
✅ Get users by role
✅ Try duplicate email (should fail)
✅ Try invalid data (should fail)
✅ Verify in pgAdmin database

---

## Next Steps

Once you've tested User CRUD operations:
1. We'll create Dog CRUD operations
2. Then BoardingRequest operations
3. Then the matching algorithm
4. Finally, the full workflow!

**Happy Testing! 🚀**
