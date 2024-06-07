export interface MovieDto {
    eidrCode: string;
    name: string;
    rating: number;
    year: number;
    status: string;
}

export interface CategoryResponse {
    id: number;
    name: string;
}

export interface GetMoviesFilter {
    categoryIds?: number[];
    eidrCode?: string;
    name?: string;
    page: number;
    pageSize: number;
    orderBy: string;
    direction: string;
}

export interface GetMovieTableResult {
    movies: MovieDto[];
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
}

export interface CreateMovieRequest {
    eidrCode: string;
    name: string;
    rating: number;
    year: number;
    status: string;
    categories: number[];  // Array of category IDs
}

export interface UpdateMovieRequest {
    eidrCode: string;
    name: string;
    rating: number;
    year: number;
    status: string;
    categories: number[];  // Array of category IDs
}

export interface DeleteMoviesRequest {
    eidrCodes: string[];
}

export interface GetMovieResponse {
    movie: MovieDto;
    categories: CategoryResponse[];
}

export enum MovieStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE"
}