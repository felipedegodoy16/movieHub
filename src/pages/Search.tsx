import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchMovies } from '../services/moviesService';

function Search() {
    const [query, setQuery] = useState('');

    const { data, isLoading } = useQuery({
        queryKey: ['search-movies', query],
        queryFn: () => searchMovies(query),
        enabled: query.length > 2,
    });

    return (
        <div>
            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar filme..."
                className="p-2 border bg-slate-500 border-slate-800 rounded-lg"
            />

            {isLoading && <p>Buscando...</p>}

            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
                {data?.map((item) => (
                    <div
                        key={item.id}
                        className="flex flex-col cursor-pointer hover:scale-105 transition-all"
                    >
                        <img
                            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                            alt={item.title}
                            className="rounded-lg shadow-[2px_8px_12px_1px_rgba(0,0,0,0.6)]"
                        />
                        <h2>{item.title}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Search;
