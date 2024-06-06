import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';
import { MovieDto, GetMovieTableResult, CategoryResponse } from '../types';
import './MovieList.css';

const MovieList: React.FC = () => {
    const [movies, setMovies] = useState<MovieDto[]>([]);
    const [categories, setCategories] = useState<CategoryResponse[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [nameFilter, setNameFilter] = useState<string>('');
    const [eidrCodeFilter, setEidrCodeFilter] = useState<string>('');
    const [page, setPage] = useState(1);
    const [pageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        // Fetch categories
        axiosInstance.get<CategoryResponse[]>('/api/movie/get-categories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    useEffect(() => {
        // Fetch movies
        axiosInstance.post<GetMovieTableResult>('/api/movie/get-movies-table', {
            categoryIds: selectedCategories,
            name: nameFilter,
            eidrCode: eidrCodeFilter,
            page,
            pageSize,
            orderBy: 'RATING',
            direction: 'DESC'
        })
            .then(response => {
                setMovies(response.data.movies);
                setTotalPages(response.data.totalPages);
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
            });
    }, [page, pageSize, selectedCategories, nameFilter, eidrCodeFilter]);

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => parseInt(option.value));
        setSelectedCategories(selectedOptions);
        setPage(1); // Reset to first page when categories change
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNameFilter(e.target.value);
        setPage(1); // Reset to first page when name filter changes
    };

    const handleEidrCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEidrCodeFilter(e.target.value);
        setPage(1); // Reset to first page when eidr code filter changes
    };

    const handleUnselectAll = () => {
        setSelectedCategories([]);
        setPage(1); // Reset to first page when categories change
    };

    return (
        <div className="container">
            <h1>Movies</h1>
            <div className="filters">
                <label htmlFor="name-filter">Filter by Name:</label>
                <input
                    id="name-filter"
                    type="text"
                    value={nameFilter}
                    onChange={handleNameChange}
                    placeholder="Enter movie name"
                />
                <label htmlFor="eidr-code-filter">Filter by EIDR Code:</label>
                <input
                    id="eidr-code-filter"
                    type="text"
                    value={eidrCodeFilter}
                    onChange={handleEidrCodeChange}
                    placeholder="Enter EIDR code"
                />
                <label htmlFor="category-select">Filter by Category:</label>
                <select
                    id="category-select"
                    multiple
                    onChange={handleCategoryChange}
                    value={selectedCategories.map(String)}
                >
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <button onClick={handleUnselectAll} className="unselect-button">
                    Unselect All
                </button>
            </div>
            <table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>EIDR Code</th>
                    <th>Name</th>
                    <th>Rating</th>
                    <th>Year</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {movies.map((movie, index) => (
                    <tr key={movie.eidrCode}>
                        <td>{(page - 1) * pageSize + index + 1}</td>
                        <td>{movie.eidrCode}</td>
                        <td>{movie.name}</td>
                        <td>{movie.rating}</td>
                        <td>{movie.year}</td>
                        <td>{movie.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={handlePreviousPage} disabled={page === 1}>
                    Previous
                </button>
                <span>Page {page} of {totalPages}</span>
                <button onClick={handleNextPage} disabled={page === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default MovieList;
