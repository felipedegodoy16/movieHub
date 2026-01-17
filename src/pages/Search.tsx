import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchMovies, getPopularMovies } from '../services/moviesService';
import type { Movie } from '../types/Movie';
import CardMovie from '../components/CardMovie';

function Search() {
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState('');
    const [textSearch, setTextSearch] = useState('Procurar por um filme.');

    const { data: dataSearch, isLoading: isLoadingSearch } = useQuery({
        queryKey: ['search-movies', query, page],
        queryFn: () => searchMovies(query, page),
        enabled: !!query,
    });

    const { data: dataPopular, isLoading: isLoadingPopular } = useQuery({
        queryKey: ['popular-movies', page],
        queryFn: () => getPopularMovies(page),
    });

    return (
        <div className="max-w-350 mx-auto px-4 pt-6">
            <div className="relative">
                <input
                    value={query}
                    onChange={(e) => {
                        setPage(1);
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
                    ? dataSearch?.results?.map((item: Movie) => (
                          <CardMovie key={item.id} item={item} />
                      ))
                    : dataPopular?.results?.map((item: Movie) => (
                          <CardMovie key={item.id} item={item} />
                      ))}
            </div>

            {(dataSearch || dataPopular) && (
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
                        disabled={
                            page ===
                            (dataSearch
                                ? dataSearch?.total_pages
                                : dataPopular?.total_pages)
                        }
                    >
                        Proximo
                    </button>
                </div>
            )}
        </div>
    );
}

export default Search;
