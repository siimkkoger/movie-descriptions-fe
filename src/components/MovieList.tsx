import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Select from 'react-select';
import axiosInstance from '../axiosConfig';
import {MovieDto, GetMovieTableResult, CategoryResponse} from '../types';
import styles from './MovieList.module.css';
import {getCategories, getMovies} from "../api/moviesApi"; // Import CSS module

const MovieList: React.FC = () => {
    const navigate = useNavigate();
    const [movies, setMovies] = useState<MovieDto[]>([]);
    const [categories, setCategories] = useState<CategoryResponse[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<{ value: number, label: string }[]>([]);
    const [nameFilter, setNameFilter] = useState<string>('');
    const [eidrCodeFilter, setEidrCodeFilter] = useState<string>('');
    const [page, setPage] = useState(1);
    const [pageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [sortBy, setSortBy] = useState<'RATING' | 'NAME'>('RATING');

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

    useEffect(() => {
        // Fetch movies
        getMovies({
            categoryIds: selectedCategories.map(cat => cat.value),
            name: nameFilter,
            eidrCode: eidrCodeFilter,
            page,
            pageSize,
            orderBy: sortBy,
            direction: sortOrder.toUpperCase()
        })
            .then(response => {
                setMovies(response.data.movies);
                setTotalPages(response.data.totalPages);
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
            });
    }, [page, pageSize, selectedCategories, nameFilter, eidrCodeFilter, sortBy, sortOrder]);

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

    const handleCategoryChange = (selectedOptions: any) => {
        setSelectedCategories(selectedOptions || []);
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

    const handleSort = (column: 'RATING' | 'NAME') => {
        const newSortOrder = sortBy === column && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortBy(column);
        setSortOrder(newSortOrder);
        setPage(1); // Reset to first page when sort changes
    };

    const handleRowClick = (eidrCode: string) => {
        navigate(`/edit/${encodeURIComponent(eidrCode)}`);
    };

    const categoryOptions = categories.map(category => ({
        value: category.id,
        label: category.name
    }));

    return (
        <div className={styles.container}>
            <h1>Movies</h1>
            <div className={styles.filtersSection}>
                <div className={styles.filters}>
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
                    <div className={styles.categoryFilter}>
                        <label htmlFor="category-select">Filter by Category:</label>
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
                </div>
            </div>
            <table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>EIDR Code</th>
                    <th>
                        <button onClick={() => handleSort('NAME')}>
                            Name {sortBy === 'NAME' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </button>
                    </th>
                    <th>
                        <button onClick={() => handleSort('RATING')}>
                            Rating {sortBy === 'RATING' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                        </button>
                    </th>
                    <th>Year</th>
                    <th>Status</th>
                    <th>Categories</th>
                </tr>
                </thead>
                <tbody>
                {movies.map((movie, index) => (
                    <tr key={movie.eidrCode} onClick={() => handleRowClick(movie.eidrCode)}>
                        <td>{(page - 1) * pageSize + index + 1}</td>
                        <td>{movie.eidrCode}</td>
                        <td>{movie.name}</td>
                        <td>{movie.rating}</td>
                        <td>{movie.year}</td>
                        <td>{movie.status}</td>
                        <td>{movie.categories}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className={styles.pagination}>
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
