# 🏨 **VK Hotel Management System**

## Overview

**VK Hotel Management System** is a comprehensive platform that allows users to book rooms, halls, and dining spaces, and make secure online payments. The system also includes various management tools for admin users and handles different room types, bookings, and payment options.

## Features

- **User Booking System**: Users can book different room types such as Single Bed, Double Bed, Dining, and Halls.
- **Admin Management**: Admins can manage bookings, rooms, and users.
- **City Selection**: Integrated city selection using an external API.
- **Room Type & Pricing**: Dynamic pricing based on room type with automatic price calculation.
- **Validation**: Form validation to ensure correct dates and data inputs.
- **Terms & Conditions**: Users are required to agree to the terms and privacy policy before booking.

## Technologies Used

### Frontend:
- **React.js**: User-friendly interface for booking and payment.
- **Axios**: For making API requests.

### Backend:
- **Node.js**: Server-side environment.
- **Express.js**: Backend framework for handling routes and business logic.

---

## Installation and Setup

### Clone the Repository:
```bash
git clone https://github.com/kushalvk/vk-hotel-management-system.git
cd vk-hotel-management-system
```

## Getting Started

### Backend Setup:

1. **Install dependencies**:
   ```bash
   cd Server
   npm install
   ```
2. **Run the backend server**:
   ```bash
   npm run start
   ```
   The backend will run on http://localhost:3001.

### Frontend Setup:

1. **Install dependencies**:
   ```bash
    cd Client
    npm install
   ```
2. **Run the backend server**:
   ```bash
   npm run dev
   ```
   The backend will run on http://localhost:5173.

# Frontend Structure

### Booking Page (` /src/components/Booking/Booking.jsx `)

This page handles the booking process, including:
- **City Selection**: Fetches available cities from an external API.
- **Room Type & Pricing**: Automatically updates the price based on room type.
- **Date Validation**: Ensures valid check-in and check-out dates.

### Payment Page (` /src/components/Payment/Payment.jsx `)
The Payment page allows users to enter payment details, such as:

- **Cardholder Name**
- **Card Number (16 digits)**
- **Expiry Date**
- **CVV (3 digits)**
- **Amount to be paid**

The payment is processed via the backend when the form is submitted.

### Other Pages:
- **Terms & Conditions**
- **Privacy Policy**
- **FAQ**
- **User Review**

###

# Backend Structure

### Payment API (` /routes/payment_router.js `)

Handles payment processing requests from the frontend. The mock payment processor simulates a 90% success rate for testing purposes. Payment Data will store in your database

```javascript
    // this is for Add payment details
    router.post("/payment", (req, res) => {
    const payment = req.body;

    PaymentModel.create(payment)
    .then((pay) => res.json(pay))
    .catch((err) => res.json(err));
});
```

### Admin & User Verification (`/routes/authentication_router.js`)
Verifies the user role and displays relevant data for admin and regular users. Admins can manage bookings, while regular users can only create bookings.

###

# Usage
1. **Booking**: Fill in the form with your name, phone, email, city, check-in/check-out dates, room type, and number of persons. Pricing is automatically updated based on room type.
2. **Payment**: After completing the booking, proceed to the Payment Page to enter your payment details and confirm the booking.
3. **Admin Panel**: Admin users can log in to manage all bookings and users.

###

# API Endpoints

* **City API**: Fetches cities using the Country State City API.
```bash
    GET https://api.countrystatecity.in/v1/countries/IN/states/GJ/cities
```

* **User API**: Verifies user role and returns user data.
```bash
    GET /user
```

* **Booking API**: Saves booking details to the database.
```bash
    POST /booking
```

* **Payment API**: Processes payments.
```bash
    POST /payment
```

###

# Screenshots

## Admin Side
### Sign Up Page
![Screenshot of Admin Sign Up](./screenshorts/Admin%20Sign%20Up.png)

### Home Page
![Screenshot of Admin Sign Up](./screenshorts/Admin%20Home.jpeg)

### Booking Page
![Screenshot of Admin Sign Up](./screenshorts/Admin%20Booking.png)


# User Side

### Sign Up
![Screenshot of Admin Sign Up](./screenshorts/Client%20Sign%20up.jpeg)

### Home Page
![Screenshot of Admin Sign Up](./screenshorts/Client%20Home.jpeg)

### Booking Page
![Screenshot of Admin Sign Up](./screenshorts/Client%20Booking.jpeg)

### Payment Page
![Screenshot of Admin Sign Up](./screenshorts/User%20Payment.jpeg)

# **Thank you** 