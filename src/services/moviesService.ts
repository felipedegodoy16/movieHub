import { tmdbApi } from './tmdbApi';
import type { Movie } from '../types/Movie';
import type { MoviesData } from '../types/MoviesData';

export async function getPopularMovies(page: number = 1): Promise<MoviesData> {
    const response = await tmdbApi.get('/movie/popular', {
        params: { page },
    });
    return response.data;
}

export async function getTopRatedMovies(page: number = 1): Promise<MoviesData> {
    const response = await tmdbApi.get('/movie/top_rated', {
        params: { page },
    });
    return response.data;
}

export async function getNowPlayingMovies(): Promise<Movie[]> {
    const response = await tmdbApi.get('/movie/now_playing');
    return response.data.results;
}

export async function getHighlightMovie(): Promise<Movie> {
    const nowPlaying = await getNowPlayingMovies();

    const response = await tmdbApi.get(`/movie/${nowPlaying[0].id}/images`);
    return response.data;
}

export async function searchMovies(
    query: string,
    page: number = 1
): Promise<MoviesData> {
    const response = await tmdbApi.get('/search/movie', {
        params: { query, page },
    });

    return response.data;
}

export const discoverMovies = async (page: number = 1) => {
    const response = await tmdbApi.get('/discover/movie', {
        params: {
            sort_by: 'popularity.desc',
            include_adult: false,
            page,
        },
    });

    return response.data;
};
