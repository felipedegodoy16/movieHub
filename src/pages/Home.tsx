import { useEffect } from 'react';
import HighlightMovie from '../components/HighlightMovie';
import PopularMovies from '../components/PopularMovies';
import TopRatedMovies from '../components/TopRatedMovies';

function Home() {
    useEffect(() => {
        document.title = 'MovieHub';
    }, []);
    return (
        <>
            <HighlightMovie />
            <PopularMovies />
            <TopRatedMovies />
        </>
    );
}

export default Home;
