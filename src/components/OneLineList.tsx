import { useEffect, useRef, useState } from 'react';
import type { Movie } from '../types/Movie';

interface Props {
    items: Movie[];
}

function OneLineList({ items }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [visibleCount, setVisibleCount] = useState(items.length);

    useEffect(() => {
        if (!containerRef.current) return;

        const firstTop = itemRefs.current[0]?.offsetTop;
        let count = 0;

        for (const item of itemRefs.current) {
            if (!item) continue;

            if (item.offsetTop !== firstTop) break;
            count++;
        }

        setVisibleCount(count);
    }, [items]);

    console.log(items);

    return (
        <div
            ref={containerRef}
            className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6"
        >
            {items.slice(0, visibleCount).map((item, index) => (
                <div
                    key={item.id}
                    ref={(el) => (itemRefs.current[index] = el)}
                    className="flex flex-col cursor-pointer hover:scale-105 transition-all relative"
                >
                    <img
                        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                        alt={item.title}
                        className="rounded-lg shadow-[2px_8px_12px_1px_rgba(0,0,0,0.6)]
"
                    />
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black to-transparent opacity-0 hover:opacity-100 transition-all duration-300 ease-in-out flex justify-center">
                        <div className="p-4 flex flex-col justify-end">
                            <h2 className="text-gray-300 text-xl text-center font-semibold">
                                {item.title}
                            </h2>
                            <div className="flex gap-2 items-center justify-center">
                                <span className="text-gray-500 text-sm text-center font-semibold">
                                    {item.release_date.slice(0, 4)}
                                </span>
                                <span className="w-1 h-1 bg-white rounded-full"></span>
                                <span className="text-gray-500 text-sm text-center font-semibold">
                                    {item.vote_average.toFixed(1)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default OneLineList;
