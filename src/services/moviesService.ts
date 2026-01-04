import { tmdbApi } from './tmdbApi';
import type { Movie } from '../types/Movie';

export async function getPopularMovies(): Promise<Movie[]> {
    const response = await tmdbApi.get('/movie/popular');
    return response.data.results;
}

export async function getTopRatedMovies(): Promise<Movie[]> {
    const response = await tmdbApi.get('/movie/top_rated');
    return response.data.results;
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

export async function searchMovies(query: string): Promise<Movie[]> {
    const response = await tmdbApi.get('/search/movie', {
        params: { query },
    });

    return response.data.results;
}
