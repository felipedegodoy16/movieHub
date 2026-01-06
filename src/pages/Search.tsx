import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchMovies, getPopularMovies } from '../services/moviesService';
import type { Movie } from '../types/Movie';

function renderMovies(item: Movie) {
    return (
        <div
            key={item.id}
            className="flex flex-col cursor-pointer hover:scale-105 transition-all relative"
        >
            <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title}
                className="rounded-lg shadow-[2px_8px_12px_1px_rgba(0,0,0,0.6)]"
            />
            <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/80 to-transparent opacity-0 hover:opacity-100 transition-all duration-300 ease-in-out flex justify-center">
                <div className="p-4 flex flex-col justify-end">
                    <h2 className="text-gray-300 text-xl text-center font-semibold">
                        {item.title}
                    </h2>
                    <div className="flex gap-2 items-center justify-center">
                        <span className="text-gray-500 text-sm text-center font-semibold flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="16px"
                                viewBox="0 -960 960 960"
                                width="24px"
                                fill="oklch(82.8% 0.189 84.429)"
                            >
                                <path d="m305-704 112-145q12-16 28.5-23.5T480-880q18 0 34.5 7.5T543-849l112 145 170 57q26 8 41 29.5t15 47.5q0 12-3.5 24T866-523L756-367l4 164q1 35-23 59t-56 24q-2 0-22-3l-179-50-179 50q-5 2-11 2.5t-11 .5q-32 0-56-24t-23-59l4-165L95-523q-8-11-11.5-23T80-570q0-25 14.5-46.5T135-647l170-57Zm49 69-194 64 124 179-4 191 200-55 200 56-4-192 124-177-194-66-126-165-126 165Zm126 135Z" />
                            </svg>
                            {item.vote_average.toFixed(1)}
                        </span>
                        <span className="w-1 h-1 bg-white rounded-full"></span>
                        <span className="text-gray-500 text-sm text-center font-semibold">
                            {item.release_date.slice(0, 4)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Search() {
    const [query, setQuery] = useState('');
    const [textSearch, setTextSearch] = useState('Procurar por um filme.');

    const { data: dataSearch, isLoading: isLoadingSearch } = useQuery({
        queryKey: ['search-movies', query],
        queryFn: () => searchMovies(query),
        enabled: !!query,
    });

    const { data: dataPopular, isLoading: isLoadingPopular } = useQuery({
        queryKey: ['popular-movies'],
        queryFn: getPopularMovies,
    });

    return (
        <div className="max-w-350 mx-auto px-4 pt-6">
            <div className="relative">
                <input
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        if (e.target.value) {
                            setTextSearch(
                                `Resultados para "${e.target.value}"`
                            );
                        } else {
                            setTextSearch('Procurar por um filme.');
                        }
                    }}
                    placeholder="Buscar filme..."
                    className="bg-slate-700/50 w-full text-lg text-slate-200 pl-4 pr-14 py-2 rounded-md shadow-[0_2px_3px_1px_rgba(0,0,0,0.3)] focus:outline-none focus:bg-slate-600/50 transition-colors"
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="32px"
                    viewBox="0 -960 960 960"
                    width="32px"
                    className="absolute right-4 top-1/2 -translate-y-1/2 fill-slate-100/50"
                >
                    <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
                </svg>
            </div>

            <h1 className="text-2xl font-bold tracking-wider text-slate-100 my-6">
                {textSearch}
            </h1>

            {isLoadingSearch ? (
                <p className="text-slate-100">Buscando...</p>
            ) : (
                isLoadingPopular && (
                    <p className="text-slate-100">Buscando...</p>
                )
            )}

            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
                {dataSearch
                    ? dataSearch?.map(
                          (item: Movie) =>
                              item.vote_average > 0 && renderMovies(item)
                      )
                    : dataPopular?.map(
                          (item: Movie) =>
                              item.vote_average > 0 && renderMovies(item)
                      )}
            </div>
        </div>
    );
}

export default Search;
