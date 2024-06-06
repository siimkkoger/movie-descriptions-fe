import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { UpdateMovieRequest, GetMovieResponse, MovieDto, CategoryResponse } from '../types';
import MovieForm from './MovieForm';

const UpdateMovie: React.FC = () => {
    const { eidrCode } = useParams<{ eidrCode: string }>();
    const [movie, setMovie] = useState<UpdateMovieRequest | null>(null);
    const [categories, setCategories] = useState<CategoryResponse[]>([]);

    useEffect(() => {
        axios.get<GetMovieResponse>(`/api/movie/${eidrCode}`)
            .then(response => {
                const movieData = response.data.movie;
                const categoryIds = response.data.categories.map(category => category.id);
                const updateMovieData: UpdateMovieRequest = {
                    ...movieData,
                    categories: categoryIds
                };
                setMovie(updateMovieData);
                setCategories(response.data.categories);
            })
            .catch(error => {
                console.error('Error fetching movie:', error);
            });
    }, [eidrCode]);

    const handleSubmit = (updatedMovie: UpdateMovieRequest) => {
        axios.put('/api/movie/update-movie', updatedMovie)
            .then(response => {
                console.log('Movie updated:', response.data);
            })
            .catch(error => {
                console.error('Error updating movie:', error);
            });
    };

    return (
        <div>
            <h1>Update Movie</h1>
            {movie && <MovieForm movie={movie} categories={categories} onSubmit={handleSubmit} />}
        </div>
    );
}

export default UpdateMovie;
