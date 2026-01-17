import { useQuery } from '@tanstack/react-query';
import { discoverMovies, searchMovies } from '../services/moviesService';
import CardMovie from '../components/CardMovie';
import type { Movie } from '../types/Movie';
import { useState } from 'react';

function returnCardMovie(item: Movie) {
    return (
        <div
            key={item.id}
            className="flex flex-col cursor-pointer hover:scale-105 transition-all relative rounded-lg overflow-hidden shadow-xl"
        >
            <div className="checked-movie absolute opacity-0 inset-0 w-full h-full flex items-center justify-center bg-black/50">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="96px"
                    viewBox="0 -960 960 960"
                    width="96px"
                    className="fill-slate-100"
                >
                    <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                </svg>
            </div>
            <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title}
                className="min-h-full"
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

async function getRandomMovie(movies: Movie[], timer: number) {
    const randomIndex = Math.floor(Math.random() * movies.length);
    const counter = document.getElementById('counter');
    const modal = document.getElementById('modal-counter');
    const movieDrawed = document.getElementById('movie-drawed');

    modal?.classList.remove('hidden');
    modal?.classList.add('flex');

    for (let i = timer - 1; i >= 0; i--) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        counter!.textContent = i.toString();
    }

    counter!.textContent = timer.toString();
    counter!.classList.add('hidden');

    if (movieDrawed) {
        movieDrawed.innerHTML = `${returnCardMovie(movies[randomIndex])}`;
    }

    movieDrawed?.classList.remove('hidden');
    movieDrawed?.classList.add('flex');

    window.alert(movies[randomIndex].title);

    modal?.addEventListener('click', () => {
        modal?.classList.remove('flex');
        modal?.classList.add('hidden');
        movieDrawed?.classList.remove('flex');
        movieDrawed?.classList.add('hidden');
        counter!.classList.remove('hidden');
        counter!.classList.add('flex');
    });
}

function loadMovies(
    movie: Movie,
    listRandomMovies: Movie[],
    setListRandomMovies: (listRandomMovies: Movie[]) => void
) {
    return (
        <CardMovie
            key={movie.id}
            item={movie}
            onClick={(e: HTMLDivElement) => {
                e.classList.toggle('border-4');
                e.classList.toggle('border-slate-100');
                e.querySelector('.checked-movie')!.classList.toggle(
                    'opacity-0'
                );
                if (e.classList.contains('border-4'))
                    setListRandomMovies([...listRandomMovies, movie]);
                else
                    setListRandomMovies(
                        listRandomMovies.filter((item) => item.id !== movie.id)
                    );

                console.log(listRandomMovies);
            }}
        />
    );
}

function Drawer() {
    const [timer, setTimer] = useState(1);
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [listRandomMovies, setListRandomMovies] = useState<Movie[]>([]);

    const { data: dataDiscover, isLoading: isLoadingDiscover } = useQuery({
        queryKey: ['discover-movies', page],
        queryFn: () => discoverMovies(page),
    });

    const { data: dataSearch, isLoading: isLoadingSearch } = useQuery({
        queryKey: ['search-movies', query, page],
        queryFn: () => searchMovies(query, page),
        enabled: !!query,
    });

    return (
        <div className="max-w-350 mx-auto px-4 pt-6">
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold tracking-wider text-slate-100">
                    Sorteador de Filmes
                </h1>
                <div className="flex gap-2">
                    <select
                        name="timer"
                        id="timer"
                        className="bg-slate-700/50 text-slate-100 text-sm px-4 py-2 rounded-md shadow-[0_2px_3px_1px_rgba(0,0,0,0.3)] focus:outline-none focus:bg-slate-600/50 transition-colors cursor-pointer"
                        onChange={(e) => {
                            setTimer(Number(e.target.value));
                        }}
                    >
                        <option value="1">1s</option>
                        <option value="5">5s</option>
                        <option value="10">10s</option>
                    </select>
                    <button
                        onClick={() => {
                            if (listRandomMovies.length) {
                                getRandomMovie(listRandomMovies, timer);
                                setListRandomMovies([]);
                            } else getRandomMovie(dataDiscover?.results, timer);
                        }}
                        className="bg-slate-700 text-slate-100 font-semibold tracking-wider border-2 border-slate-500 px-4 py-2 rounded-md shadow-[inset_0_0_1px_1px_#0f172b,0_3px_5px_1px_rgba(0,0,0,0.8),0_3px_5px_1px_rgba(0,0,0,0.8)] cursor-pointer flex gap-2 items-center hover:bg-slate-800 hover:border-slate-700 transition-colors"
                    >
                        Sortear{' '}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            className="fill-slate-100"
                        >
                            <path d="M204-318q-22-38-33-78t-11-82q0-134 93-228t227-94h7l-64-64 56-56 160 160-160 160-56-56 64-64h-7q-100 0-170 70.5T240-478q0 26 6 51t18 49l-60 60ZM481-40 321-200l160-160 56 56-64 64h7q100 0 170-70.5T720-482q0-26-6-51t-18-49l60-60q22 38 33 78t11 82q0 134-93 228t-227 94h-7l64 64-56 56Z" />
                        </svg>
                    </button>
                </div>
            </header>

            <div className="relative mb-6">
                <input
                    value={query}
                    onChange={(e) => {
                        setPage(1);
                        setQuery(e.target.value);
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

            {isLoadingDiscover ? (
                <p className="text-slate-100">Buscando...</p>
            ) : (
                isLoadingSearch && <p className="text-slate-100">Buscando...</p>
            )}

            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
                {dataSearch?.results
                    ? dataSearch?.results.map((movie: Movie) =>
                          loadMovies(
                              movie,
                              listRandomMovies,
                              setListRandomMovies
                          )
                      )
                    : dataDiscover?.results.map((movie: Movie) =>
                          loadMovies(
                              movie,
                              listRandomMovies,
                              setListRandomMovies
                          )
                      )}
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
                    disabled={
                        page ===
                        (dataSearch
                            ? dataSearch?.total_pages
                            : dataDiscover?.total_pages)
                    }
                >
                    Proximo
                </button>
            </div>

            <div
                id="modal-counter"
                className="fixed hidden inset-0 bg-black/50 z-50 items-center justify-center"
            >
                <div
                    id="counter"
                    className="text-[10rem] font-bold tracking-wider text-slate-100"
                >
                    {timer}
                </div>
                <div id="movie-drawed" className="hidden"></div>
            </div>
        </div>
    );
}

export default Drawer;
