export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    vote_average: number;
    backdrop_path: string;
    backdrops: {
        file_path: string;
    }[];
    release_date: string;
}
