import React, { useState, useEffect } from 'react';
import { CreateMovieRequest, UpdateMovieRequest, CategoryResponse } from '../types';

interface MovieFormProps {
    movie?: CreateMovieRequest | UpdateMovieRequest;
    categories: CategoryResponse[];
    onSubmit: (movie: CreateMovieRequest | UpdateMovieRequest) => void;
}

const MovieForm: React.FC<MovieFormProps> = ({ movie, categories, onSubmit }) => {
    const [formState, setFormState] = useState<CreateMovieRequest | UpdateMovieRequest>({
        eidrCode: movie?.eidrCode || '',
        name: movie?.name || '',
        rating: movie?.rating || 0,
        year: movie?.year || new Date().getFullYear(),
        status: movie?.status || 'ACTIVE',
        categories: movie?.categories || []
    });

    useEffect(() => {
        setFormState(movie || {
            eidrCode: '',
            name: '',
            rating: 0,
            year: new Date().getFullYear(),
            status: 'ACTIVE',
            categories: []
        });
    }, [movie]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: name === 'categories' ? value.split(',').map(Number) : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formState);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>EIDR Code</label>
                <input type="text" name="eidrCode" value={formState.eidrCode} onChange={handleChange} required />
            </div>
            <div>
                <label>Name</label>
                <input type="text" name="name" value={formState.name} onChange={handleChange} required />
            </div>
            <div>
                <label>Rating</label>
                <input type="number" name="rating" value={formState.rating} onChange={handleChange} required />
            </div>
            <div>
                <label>Year</label>
                <input type="number" name="year" value={formState.year} onChange={handleChange} required />
            </div>
            <div>
                <label>Status</label>
                <select name="status" value={formState.status} onChange={handleChange} required>
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                </select>
            </div>
            <div>
                <label>Categories</label>
                <input type="text" name="categories" value={formState.categories.join(',')} onChange={handleChange} required />
                <small>Enter category IDs separated by comma</small>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}

export default MovieForm;
