import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Select from 'react-select';
import {CategoryResponse, CreateMovieRequest, MovieStatus} from '../types';
import styles from '../styles/CreateMovie.module.css'; // Import CSS module
import {createMovie, getCategories} from '../api/moviesApi';

const CreateMovie: React.FC = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState<CategoryResponse[]>([]); // Initialize with an empty array
    const [selectedCategories, setSelectedCategories] = useState<{ value: number, label: string }[]>([]);
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' | '' }>({text: '', type: ''});
    const [loading, setLoading] = useState<boolean>(false);
    const [movieData, setMovieData] = useState({
        eidrCode: '',
        name: '',
        rating: 0,
        year: new Date().getFullYear(),
        status: MovieStatus.ACTIVE
    });

    useEffect(() => {
        // Fetch categories
        getCategories()
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setMovieData({...movieData, [e.target.name]: e.target.value});
    };

    const handleCategoryChange = (selectedOptions: any) => {
        setSelectedCategories(selectedOptions || []);
    };

    const handleSave = () => {
        const createRequest: CreateMovieRequest = {
            ...movieData,
            categories: selectedCategories.map(cat => cat.value)
        };

        createMovie(createRequest)
            .then(() => {
                setMessage({text: 'Movie created successfully!', type: 'success'});
                setLoading(true);
                setTimeout(() => {
                    setLoading(false);
                    navigate('/');
                }, 2000); // Redirect after 2 seconds
            })
            .catch(error => {
                setMessage({text: 'Error creating movie. Please try again.', type: 'error'});
                console.error('Error creating movie:', error);
            });
    };

    const categoryOptions = categories.map(category => ({
        value: category.id,
        label: category.name
    }));

    return (
        <div className={styles.container}>
            <h1>Create Movie</h1>
            <div className={styles.formGroup}>
                <label htmlFor="eidrCode">EIDR Code:</label>
                <input
                    id="eidrCode"
                    name="eidrCode"
                    type="text"
                    value={movieData.eidrCode}
                    onChange={handleInputChange}
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="name">Name:</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    value={movieData.name}
                    onChange={handleInputChange}
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="rating">Rating:</label>
                <input
                    id="rating"
                    name="rating"
                    type="number"
                    value={movieData.rating}
                    onChange={handleInputChange}
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="year">Year:</label>
                <input
                    id="year"
                    name="year"
                    type="number"
                    value={movieData.year}
                    onChange={handleInputChange}
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="status">Status:</label>
                <select
                    id="status"
                    name="status"
                    value={movieData.status}
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

export default CreateMovie;
