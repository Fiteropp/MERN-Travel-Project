
# Arieval Travel Agency Website 

Welcome to the **Arieval Travel Agency Website**, a school project designed to showcase a fully functional travel agency platform. This web application allows users to browse destinations, book trips, and explore exciting travel packages. It is built using the **MERN Stack** (MongoDB, Express, React, Node.js) with **Vite** for the frontend.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)

---

## Features
- **User Authentication**: Sign up, log in, and secure user sessions.
- **Dynamic Destinations**: Explore a list of destinations stored in the database.
- **Travel Package Booking**: Book trips with ease.
- **Admin Panel**: Manage destinations, users, and bookings (if implemented).
- **Responsive Design**: Optimized for desktop and mobile devices.

---

## Tech Stack
### Frontend
- [**React.js**](https://react.dev/): Component-based UI development
- [**Vite**](https://vite.dev/): Lightning-fast development build tool
- **CSS**: Styling and layout

### Backend
- [**Node.js**](https://nodejs.org/en): JavaScript runtime environment
- [**Express.js**](https://expressjs.com/): Web framework for API development
- [**MongoDB**](https://www.mongodb.com/): NoSQL database
- [**Mongoose**](https://mongoosejs.com/): Object Data Modeling (ODM) for MongoDB

---

## Installation

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Git](https://git-scm.com/)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/Fiteropp/MERN-Travel-Project.git

2. Navigate to the project folder:

        cd MERN-Travel-Project

3. Install dependencies for both client and server:

        cd client
        npm install
        cd server/react
        npm install

4. Configure the environment variables:

      Create a .env file in the server directory.
      Add the following variables:
      
          MONGO_URI=your_mongodb_connection_string
          PORT=8080
          JWT_SECRET=your_jwt_secret

5. Start the development servers:

     - Backend:
    
            cd server
            npm run dev
    
     - Frontend:
    
            cd client
            npm run dev

6. Open your browser and visit:

        http://localhost:5173

## Folder Structure

    MERN-Travel-Project/
    │
    ├── client/                     # Frontend code (built with Vite)
    │   ├── public/                 # Static files
    │   ├── src/                    # Source files
    │   │   ├── assets/             # Images, icons, and other static assets
    │   │   ├── components/         # Reusable React components
    │   │   ├── pages/              # Page components for different routes
    │   │   ├── context/            # React context for state management
    │   │   ├── styles/             # CSS or SCSS files
    │   │   ├── utils/              # Helper functions
    │   │   ├── App.jsx             # Main application component
    │   │   ├── main.jsx            # Entry point for Vite
    │   └── vite.config.js          # Vite configuration
    │
    ├── server/                     # Backend code
    │   ├── config/                 # Configuration files (e.g., database connection)
    │   ├── controllers/            # Request handler functions
    │   ├── middleware/             # Middleware for authentication, validation, etc.
    │   ├── models/                 # Mongoose models for MongoDB collections
    │   ├── routes/                 # Express route handlers
    │   ├── utils/                  # Utility functions
    │   ├── server.js               # Main server setup
    │   └── .env                    # Environment variables (not included in version control)
    │
    ├── README.md                   # Project documentation
    ├── package.json                # Dependency management
    └── .gitignore                  # Files and directories to ignore in Git



## Usage

- Browse Destinations: Explore exciting travel packages.
- Book Trips: Sign in to reserve your favorite destinations.
- Admin Features (if applicable): Manage destinations and user accounts.

