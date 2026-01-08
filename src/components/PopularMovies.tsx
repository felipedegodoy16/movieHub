import { useQuery } from '@tanstack/react-query';
import { getPopularMovies } from '../services/moviesService';
import OneLineList from '../components/OneLineList';
import { Link } from 'react-router-dom';

function PopularMovies() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['popular-movies'],
        queryFn: () => getPopularMovies(),
    });

    if (isLoading) return <p>Carregando...</p>;
    if (error) return <p>Erro ao buscar filmes</p>;

    return (
        <div className="max-w-350 mx-auto px-4">
            <div className="flex justify-between items-center text-xl text-slate-50 italic border-b border-slate-500 mb-4 pb-2 shadow-[0_1px_0_0_#0f172b]">
                <span className="text-slate-300">Populares</span>
                <Link
                    to="/all-movies/popular"
                    className="text-slate-300 hover:text-slate-50 cursor-pointer transition-colors"
                >
                    Ver tudo
                </Link>
            </div>
            <OneLineList items={data?.results || []} />
        </div>
    );
}

export default PopularMovies;
