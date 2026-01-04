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

    return (
        <div
            ref={containerRef}
            className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6"
        >
            {items.slice(0, visibleCount).map((item, index) => (
                <div
                    key={item.id}
                    ref={(el) => (itemRefs.current[index] = el)}
                    className="flex flex-col cursor-pointer hover:scale-105 transition-all"
                >
                    <img
                        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                        alt={item.title}
                        className="rounded-lg shadow-[2px_8px_12px_1px_rgba(0,0,0,0.6)]
"
                    />
                </div>
                // <div
                //     key={item.id}
                //     ref={(el) => (itemRefs.current[index] = el)}
                //     className="px-3 py-1 bg-neutral-800 rounded"
                // >
                //     {item.title}
                // </div>
            ))}
        </div>
    );
}

export default OneLineList;
