
# Project Name: **Hotel Management System - Front End**

## Table of Contents
1. [Overview](#overview)
2. [Technologies Used](#technologies-used)
3. [Folder Structure](#folder-structure)
4. [Setup and Installation](#setup-and-installation)
5. [Development Guidelines](#development-guidelines)
6. [Component Naming Conventions](#component-naming-conventions)
7. [Styling](#styling)
8. [API Integration](#api-integration)
9. [Best Practices](#best-practices)

## Overview
The front-end of the **Hotel Management System** allows users to view room information, book rooms, manage their bookings, and more. The front-end communicates with a backend API and is built using **React** with **Tailwind CSS** for styling and **i18next** for multi-language support.

## Technologies Used
- **React**: JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for custom designs.
- **Axios**: Promise-based HTTP client for API integration.
- **React Router**: For handling routing in the app.

## Folder Structure
```bash
src/
│
├── components/       # Reusable components
│   ├── BookingForm.jsx   # Component for booking form
│   ├── Footer.jsx        # Footer component
│   ├── Header.jsx        # Header component
│   ├── Home.jsx          # Homepage
│   ├── BookingPage.jsx   # Booking page
│   ├── MyBooking.jsx     # User booking details page
│   └── Profile.jsx       # User profile page
│
├── App.js            # Main application file
├── index.js          # Entry point for React
```

## Setup and Installation
To set up the project locally, follow these steps:

### Prerequisites
- Make sure you have **Node.js** installed.
- **npm** (Node Package Manager) should be available.

### Installation Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/kushalvk/Hotel-Management-System/Client.git
   ```

2. Navigate into the project directory:
   ```bash
   cd Client
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

The app should now be running on `http://localhost:3000`.

## Development Guidelines
- Follow **component-based architecture**.
- Break down UI elements into smaller, reusable components.
- Use **functional components** with React Hooks.
- Ensure each component has a clear responsibility.

### File Naming
- **Component files** should be named in PascalCase, e.g., `BookingForm.jsx`.
- **CSS files** (if any) should be named in kebab-case, e.g., `header.css`.

## Component Naming Conventions
- Components that serve as pages should be stored in the `pages` directory and should reflect their purpose, such as `BookingPage.jsx`.
- Reusable components like forms, buttons, and headers should be in the `components` directory.

## API Integration
API requests are made using **Axios**. All the API logic is stored in the `services/api.js` file. 

### Example API Call
```javascript
import axios from 'axios';

export const getBookings = async () => {
  try {
    const response = await axios.get('/api/bookings');
    return response.data;
  } catch (error) {
    console.error("Error fetching bookings", error);
  }
};
```

## Best Practices
- **Keep components small** and focused on a single functionality.
- Use **prop-types** to ensure correct prop types are passed to components.
- Handle **error boundaries** for API calls and handle loading states properly.
- Keep state management within components and lift state up when necessary.
- Use **React Context** for global states like user authentication or app language settings.
