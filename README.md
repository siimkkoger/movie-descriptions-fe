# Movie Descriptions Frontend

## Overview

The **Movie Descriptions Frontend** is a web application that allows users to search for movies and view their descriptions. The frontend is built using React.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Additional Notes](#additional-notes)

## Features
- Create Movie: Add a new movie with specific details and associated categories.
- Update Movie: Modify the details of an existing movie.
- Delete Movie: Remove a movie from the database.
- Fetch Movies: Retrieve details of movies with optional filtering and pagination.
- Fetch Categories: Get a list of all available categories.

## Technology Stack
- React: JavaScript library for building user interfaces.
- TypeScript: Typed superset of JavaScript.
- Axios: Promise-based HTTP client for making API requests.
- React Router: Library for routing in React applications.
- React Select: Flexible select input control for React.
- CSS Modules: Scoped CSS for styling components.

## Getting Started
### Prerequisites
- Node.js (v14 or later)
- npm (v6 or later) or yarn (v1.22 or later)

### Installation
1. Clone the repository.
   ```sh
   git clone https://github.com/your-username/movie-descriptions-frontend.git
   cd movie-descriptions-frontend
   ```
   
2. Install dependencies.
   ```sh
    npm install
    ```

### Project Structure
The project structure is as follows:
```
src/
|-- api/
|   |-- moviesApi.ts       # API calls for movies and categories
|-- components/
|   |-- CreateMovie.tsx    # Component for creating a movie
|   |-- DeleteMovies.tsx   # Component for deleting movies
|   |-- EditMovie.tsx      # Component for editing a movie
|   |-- MovieForm.tsx      # Form component used in Create and Edit movie
|   |-- MovieList.tsx      # Component for displaying a list of movies
|-- types/
|   |-- index.ts           # TypeScript types
|-- styles/
|   |-- CreateMovie.module.css  # CSS module for CreateMovie component
|   |-- EditMovie.module.css    # CSS module for EditMovie component
|   |-- MovieList.module.css    # CSS module for MovieList component
|-- App.tsx                # Main application component
|-- index.tsx              # Entry point for the React application
```

## Additional Notes
- Ensure that the backend server is running on http://localhost:8080 before starting the frontend application to avoid any API request issues.
- For detailed API documentation, visit the Swagger UI at http://localhost:8080/swagger-ui.html when the backend server is running.
