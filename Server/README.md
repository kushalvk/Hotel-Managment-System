
# Backend Documentation

## Table of Contents
- [Introduction](#introduction)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Error Handling](#error-handling)
- [Deployment](#deployment)

---

## Introduction
This document covers the backend setup for the Hotel Management System. The backend is developed using **Node.js** and **Express**, with a **MongoDB** database. The backend is responsible for handling business logic, API requests, user authentication, and data storage.

---

## Installation
To set up the backend, follow these steps:

### Prerequisites
- **Node.js** (v14+)
- **MongoDB** (local or hosted)
- **npm** (v6+)

### Steps
1. Clone the repository:
    ```bash
    git clone https://github.com/your-repo/hotel-management-System/Server.git
    cd hotel-management-System/Server
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables (see next section).

4. Start the development server:
    ```bash
    npm start
    ```

---

## Environment Variables
Create a `.env` file in the root of the project with the following environment variables:

```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/hotel-db
JWT_SECRET=your_jwt_secret_key
API_KEY=your_api_key
FRONTEND_URL=http://localhost:3000
```

Replace `your_jwt_secret_key` and `your_api_key` with actual values. You can use a different MongoDB connection string based on your environment.

---

## Database Setup
The backend uses **MongoDB** as the database. Ensure that your MongoDB instance is running locally or remotely, and set the connection string in the `.env` file.

The database contains the following collections:
- **Users**: Stores user credentials and roles.
- **Bookings**: Stores booking information.
- **Rooms**: Information about room types, prices, and capacity.
- **Payments**: Stores payment transaction records.

To initialize the database with default room types and prices, run the following script:

---

## API Endpoints
Below is a list of the main API endpoints used in the application:

### **User Routes**
- `POST /register`: Register a new user.
- `POST /login`: Log in a user and return a JWT.
- `GET /user`: Get logged-in user's data.

### **Booking Routes**
- `POST /booking`: Create a new booking.
- `GET /bookings`: Get all bookings.
- `DELETE /booking/:id`: Delete a specific booking.
- `DELETE /delete-old-bookings`: Automatically deletes bookings older than the current date.

### **Payment Routes**
- `POST /payment`: Process a payment for booking.
- `GET /payment-status/:id`: Get payment status.

---

## Authentication
Authentication is done via **JWT tokens**. Once a user logs in, a token is issued and must be included in the `Authorization` header for any subsequent API requests.

Example request:
```bash
GET /bookings
Authorization: Bearer <JWT_TOKEN>
```

---

## Error Handling
Errors are handled using Express’s built-in middleware. In case of an error, the API returns a response with:
- **Status Code**: Appropriate HTTP status code (e.g., 400, 401, 500)
- **Message**: Error description.

Example error response:
```javascript
// register
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" }); // 400 for bad request
    }

    // Hash password
    const hash_password = await bcrypt.hash(password, 12); // 12 is the salt round

    // Create new user
    const newUser = await UserModel.create({
      username,
      email,
      password: hash_password,
      role,
    });
    res.status(201).json(newUser); // 201 for resource created
  } catch (err) {
    res.status(500).json({ error: "Signup failed", details: err.message }); // 500 for server error
  }
});
```

---

## Deployment
### Steps to deploy:
1. Build the project:
    ```bash
    npm run build
    ```

2. Upload the code to a hosting service (e.g., AWS, Heroku).

3. Set the environment variables on the hosting service.

4. Start the server:
    ```bash
    npm start
    ```

Ensure that your MongoDB database is accessible from the hosting environment.
