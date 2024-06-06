import React, { useState } from 'react';
import axios from 'axios';
import { CreateMovieRequest, CategoryResponse } from '../types';
import MovieForm from './MovieForm';

const CreateMovie: React.FC = () => {
    const [categories, setCategories] = useState<CategoryResponse[]>([]);

    const handleSubmit = (movie: CreateMovieRequest) => {
        axios.post('/api/movie/create-movie', movie)
            .then(response => {
                console.log('Movie created:', response.data);
            })
            .catch(error => {
                console.error('Error creating movie:', error);
            });
    };

    return (
        <div>
            <h1>Create Movie</h1>
            <MovieForm categories={categories} onSubmit={handleSubmit} />
        </div>
    );
}

export default CreateMovie;
