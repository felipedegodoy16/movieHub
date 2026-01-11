import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPopularMovies, getTopRatedMovies } from '../services/moviesService';
import CardMovie from '../components/CardMovie';
import type { Movie } from '../types/Movie';

function PageAllMovies() {
    const { movies } = useParams();
    const [page, setPage] = useState(1);
    const queryKey = [movies, page];
    const queryFn =
        movies === 'popular'
            ? () => getPopularMovies(page)
            : () => getTopRatedMovies(page);

    const { data, isLoading, error } = useQuery({
        queryKey,
        queryFn,
    });

    const title =
        movies === 'popular' ? 'Filmes Populares' : 'Filmes Top Avaliados';

    console.error(error);

    useEffect(() => {
        document.title = title;
    }, [title]);

    return (
        <div className="max-w-350 mx-auto px-4 pt-6">
            <h1 className="text-2xl font-bold tracking-wider text-slate-100 mb-6">
                {title}
            </h1>

            {isLoading && <p className="text-slate-100">Buscando...</p>}

            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
                {data?.results?.map((item: Movie) => (
                    <CardMovie key={item.id} item={item} />
                ))}
            </div>

            <div className="w-full flex justify-center items-center gap-4 mt-6">
                <button
                    className="bg-slate-700/50 text-slate-100 text-sm px-4 py-2 rounded-md shadow-[0_2px_3px_1px_rgba(0,0,0,0.3)] hover:bg-slate-600/50 transition-colors cursor-pointer"
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                >
                    Anterior
                </button>
                <span className="text-slate-100 text-sm font-semibold tracking-wider">
                    Página {page}
                </span>
                <button
                    className="bg-slate-700/50 text-slate-100 text-sm px-4 py-2 rounded-md shadow-[0_2px_3px_1px_rgba(0,0,0,0.3)] hover:bg-slate-600/50 transition-colors cursor-pointer"
                    onClick={() => setPage(page + 1)}
                    disabled={page === data?.total_pages}
                >
                    Proximo
                </button>
            </div>
        </div>
    );
}

export default PageAllMovies;
