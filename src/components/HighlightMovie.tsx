import { useQuery } from '@tanstack/react-query';
import {
    getHighlightMovie,
    getNowPlayingMovies,
} from '../services/moviesService';

function HighlightMovie() {
    const {
        data: dataHighlight,
        isLoading: isLoadingHighlight,
        error: errorHighlight,
    } = useQuery({
        queryKey: ['highlight-movie'],
        queryFn: getHighlightMovie,
    });

    const {
        data: nowPlayingData,
        isLoading: nowPlayingLoading,
        error: nowPlayingError,
    } = useQuery({
        queryKey: ['now-playing-movies'],
        queryFn: getNowPlayingMovies,
    });

    if (isLoadingHighlight) return <p>Carregando...</p>;
    if (errorHighlight) return <p>Erro ao buscar filmes</p>;

    if (nowPlayingLoading) return <p>Carregando...</p>;
    if (nowPlayingError) return <p>Erro ao buscar filmes</p>;

    return (
        <div
            className="w-full h-[600px] mb-6 relative"
            style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${dataHighlight?.backdrops[0].file_path})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="w-full h-full bg-linear-to-t from-black/70 to-black/0"></div>
            <div className="absolute right-4 bottom-4 flex flex-col gap-2">
                <div className="text-white flex flex-col gap-2">
                    <span className="flex items-center justify-end gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="oklch(82.8% 0.189 84.429)"
                        >
                            <path d="m305-704 112-145q12-16 28.5-23.5T480-880q18 0 34.5 7.5T543-849l112 145 170 57q26 8 41 29.5t15 47.5q0 12-3.5 24T866-523L756-367l4 164q1 35-23 59t-56 24q-2 0-22-3l-179-50-179 50q-5 2-11 2.5t-11 .5q-32 0-56-24t-23-59l4-165L95-523q-8-11-11.5-23T80-570q0-25 14.5-46.5T135-647l170-57Zm49 69-194 64 124 179-4 191 200-55 200 56-4-192 124-177-194-66-126-165-126 165Zm126 135Z" />
                        </svg>
                        <span>
                            {nowPlayingData?.[0].vote_average.toFixed(1)}
                        </span>
                        <span className="w-1 h-1 bg-white rounded-full"></span>
                        <span>
                            {nowPlayingData?.[0].release_date.slice(0, 4)}
                        </span>
                    </span>
                </div>
                <div className="flex gap-2">
                    <button className="bg-slate-700 text-slate-100 font-semibold tracking-wider border-2 border-slate-500 px-4 py-2 rounded-md shadow-[inset_0_0_1px_1px_#0f172b,0_3px_5px_1px_rgba(0,0,0,0.8),0_3px_5px_1px_rgba(0,0,0,0.8)] cursor-pointer flex gap-2 items-center hover:bg-slate-800 hover:border-slate-700 transition-colors">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="#f1f5f9"
                        >
                            <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
                        </svg>
                        Adicionar aos Favoritos
                    </button>
                    <button className="bg-slate-700 text-slate-100 font-semibold tracking-wider border-2 border-slate-500 px-4 py-2 rounded-md shadow-[inset_0_0_1px_1px_#0f172b,0_3px_5px_1px_rgba(0,0,0,0.8),0_3px_5px_1px_rgba(0,0,0,0.8)] cursor-pointer flex gap-2 items-center hover:bg-slate-800 hover:border-slate-700 transition-colors">
                        Assistir Agora
                    </button>
                </div>
            </div>
        </div>
    );
}

export default HighlightMovie;
