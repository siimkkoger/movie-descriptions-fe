# Movie Descriptions Frontend

## Overview

The **Movie Descriptions Frontend** is a web application that allows users to search for movies and view their descriptions. The frontend is built using React.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
- [Additional Notes](#additional-notes)

## Features
-  The user has two views:
   -  Movie overview in table format
   -  Add new movie view
-  The user can add new movies.
   -  It is possible to select categories from all predefined categories
-  The user is shown up to 5 movies at a time in the table. The table is paginated.
-  The user can search for movies by name and EIDR code.
-  The user can filter movies by category.
-  The user can sort movies by rating and name.
-  The user can activate and deactivate movies (status).
-  The user can delete multiple movies from the system completely.

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

![alt text](https://github.com/siimkkoger/movie-descriptions-fe/examples/image_create_movie.png?raw=true)