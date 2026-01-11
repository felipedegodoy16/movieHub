import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Search from '../pages/Search';
import PageAllMovies from '../pages/AllMovies';
import Drawer from '../pages/Drawer';

function AppRoutes() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/all-movies/:movies" element={<PageAllMovies />} />
                <Route path="/drawer" element={<Drawer />} />
            </Route>
        </Routes>
    );
}

export default AppRoutes;
