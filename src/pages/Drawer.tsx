import { useQuery } from '@tanstack/react-query';
import { discoverMovies } from '../services/moviesService';
import CardMovie from '../components/CardMovie';
import type { Movie } from '../types/Movie';
import { useState } from 'react';

async function getRandomMovie(movies: Movie[], timer: number) {
    const randomIndex = Math.floor(Math.random() * movies.length);
    // const svg = document.querySelector('svg');
    const counter = document.getElementById('counter');
    const modal = document.getElementById('modal-counter');

    modal?.classList.remove('hidden');
    modal?.classList.add('flex');

    for (let i = timer - 1; i >= 0; i--) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        counter!.textContent = i.toString();
    }

    counter!.textContent = timer.toString();

    modal?.classList.remove('flex');
    modal?.classList.add('hidden');

    alert(movies[randomIndex].title);
    return movies[randomIndex];
}

function Drawer() {
    const [timer, setTimer] = useState(1);
    const { data } = useQuery({
        queryKey: ['discover-movies'],
        queryFn: discoverMovies,
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
                            getRandomMovie(data?.results, timer);
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
            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
                {data?.results.map((movie: Movie) => (
                    <CardMovie key={movie.id} item={movie} />
                ))}
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
            </div>
        </div>
    );
}

export default Drawer;
