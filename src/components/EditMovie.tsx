import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import axiosInstance from '../axiosConfig';
import { MovieDto, CategoryResponse, UpdateMovieRequest, MovieStatus } from '../types';
import styles from './EditMovie.module.css'; // Import CSS module

interface GetMovieResponse {
    movie: MovieDto;
    categories: CategoryResponse[];
}

const EditMovie: React.FC = () => {
    const { eidrCode } = useParams<{ eidrCode: string }>();
    const navigate = useNavigate();
    const [movie, setMovie] = useState<MovieDto | null>(null);
    const [categories, setCategories] = useState<CategoryResponse[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<{ value: number, label: string }[]>([]);
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' | '' }>({ text: '', type: '' });
    const [loading, setLoading] = useState<boolean>(false);
    const decodedEidrCode = decodeURIComponent(eidrCode ? eidrCode : '');

    useEffect(() => {
        // Fetch movie details
        axiosInstance.get<GetMovieResponse>(`/api/movie/get-movie`, { params: { eidrCode: decodedEidrCode } })
            .then(response => {
                const movieData = response.data.movie;
                setMovie(movieData);
                const selectedCategories = response.data.categories.map(cat => ({ value: cat.id, label: cat.name }));
                setSelectedCategories(selectedCategories);
            })
            .catch(error => {
                console.error('Error fetching movie details:', error);
            });

        // Fetch categories
        axiosInstance.get<CategoryResponse[]>('/api/movie/get-categories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, [eidrCode]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        if (movie) {
            setMovie({ ...movie, [e.target.name]: e.target.value });
        }
    };

    const handleCategoryChange = (selectedOptions: any) => {
        setSelectedCategories(selectedOptions || []);
    };

    const handleSave = () => {
        if (movie) {
            const updateRequest: UpdateMovieRequest = {
                eidrCode: movie.eidrCode,
                name: movie.name,
                rating: movie.rating,
                year: movie.year,
                status: movie.status,
                categories: selectedCategories.map(cat => cat.value)
            };
            axiosInstance.put('/api/movie/update-movie', updateRequest)
                .then(() => {
                    setMessage({ text: 'Movie updated successfully!', type: 'success' });
                    setLoading(true);
                    setTimeout(() => {
                        setLoading(false);
                        navigate('/');
                    }, 2000); // Redirect after 2 seconds
                })
                .catch(error => {
                    setMessage({ text: 'Error updating movie. Please try again.', type: 'error' });
                    console.error('Error updating movie:', error);
                });
        }
    };

    if (!movie) return <div>Loading...</div>;

    const categoryOptions = categories.map(category => ({
        value: category.id,
        label: category.name
    }));

    return (
        <div className={styles.container}>
            <h1>Edit Movie</h1>
            <div className={styles.formGroup}>
                <label htmlFor="name">Name:</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    value={movie.name}
                    onChange={handleInputChange}
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="rating">Rating:</label>
                <input
                    id="rating"
                    name="rating"
                    type="number"
                    value={movie.rating}
                    onChange={handleInputChange}
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="year">Year:</label>
                <input
                    id="year"
                    name="year"
                    type="number"
                    value={movie.year}
                    onChange={handleInputChange}
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="status">Status:</label>
                <select
                    id="status"
                    name="status"
                    value={movie.status}
                    onChange={handleInputChange}
                >
                    <option value={MovieStatus.ACTIVE}>ACTIVE</option>
                    <option value={MovieStatus.INACTIVE}>INACTIVE</option>
                </select>
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="category-select">Categories:</label>
                <Select
                    id="category-select"
                    isMulti
                    options={categoryOptions}
                    value={selectedCategories}
                    onChange={handleCategoryChange}
                    className={styles.multiSelect}
                    classNamePrefix="multiSelect"
                />
            </div>
            <button onClick={handleSave} className={styles.saveButton}>Save</button>
            {message.text && (
                <div className={`${styles.message} ${message.type === 'success' ? styles.success : styles.error}`}>
                    {message.text}
                </div>
            )}
            {loading && <div className={styles.loading}>Saving movie...</div>}
        </div>
    );
};

export default EditMovie;
