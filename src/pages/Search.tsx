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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar filme..."
            />

            {isLoading && <p>Buscando...</p>}

            {data?.map((movie) => (
                <div key={movie.id}>
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                    />
                    <h2>{movie.title}</h2>
                </div>
            ))}
        </div>
        // <div>

        //     <ul>
        //         {data?.map((movie) => (
        //             <li key={movie.id}>{movie.title}</li>
        //         ))}
        //     </ul>
        // </div>
    );
}

export default Search;
