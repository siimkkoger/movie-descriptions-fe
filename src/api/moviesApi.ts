import axios, { AxiosResponse } from 'axios';
import {
    MovieDto,
    GetMoviesFilter,
    CreateMovieRequest,
    UpdateMovieRequest,
    DeleteMoviesRequest,
    GetMovieResponse,
    CategoryResponse,
    GetMovieTableResult
} from '../types';

// Create an axios instance
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080', // Use the backend server URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export const CREATE_MOVIE_URL = '/api/movie/create-movie';
export const UPDATE_MOVIE_URL = '/api/movie/update-movie';
export const DELETE_MOVIES_URL = '/api/movie/delete-movies';
export const GET_MOVIES_URL = '/api/movie/get-movies-table';
export const GET_MOVIE_URL = '/api/movie/:id';
export const GET_CATEGORIES_URL = '/api/movie/get-categories';

export const createMovie = async (movieData: CreateMovieRequest): Promise<AxiosResponse<MovieDto>> => {
    return await axiosInstance.post(CREATE_MOVIE_URL, movieData);
};

export const updateMovie = async (movieData: UpdateMovieRequest): Promise<AxiosResponse<MovieDto>> => {
    return await axiosInstance.put(UPDATE_MOVIE_URL, movieData);
};

export const deleteMovies = async (eidrCodes: DeleteMoviesRequest): Promise<AxiosResponse<void>> => {
    return await axiosInstance.post(DELETE_MOVIES_URL, eidrCodes);
};

export const getMovies = async (filters: GetMoviesFilter): Promise<AxiosResponse<GetMovieTableResult>> => {
    return await axiosInstance.post(GET_MOVIES_URL, filters)
};

export const getMovie = async (id: string): Promise<AxiosResponse<GetMovieResponse>> => {
    return await axiosInstance.get(GET_MOVIE_URL.replace(':id', id));
};

export const getCategories = async (): Promise<AxiosResponse<CategoryResponse[]>> => {
    return await axiosInstance.get(GET_CATEGORIES_URL);
};
