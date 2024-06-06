import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Movie {
    eidrCode: string;
    name: string;
    rating: number;
    year: number;
}

const MoviePage: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        axios.get<Movie[]>('/api/movies/get-') // Update the URL to match your backend endpoint
            .then(response => {
                setMovies(response.data);
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
            });
    }, []);

    return (
        <div>
            <h1>Movies</h1>
            <ul>
                {movies.map(movie => (
                    <li key={movie.eidrCode}>{movie.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default MoviePage;