import moviehub from '../assets/moviehub.png';
import texture from '../assets/texture.png';
import { Link, Outlet } from 'react-router-dom';
import './../index.css';

function MainLayout() {
    return (
        <>
            <header className="bg-slate-900 p-4 w-full text-white sticky inset-0 z-50">
                <div className="flex gap-4 items-center justify-between max-w-350 mx-auto">
                    <div className="flex items-center gap-8">
                        {/* <nav>
                            <ul className="flex flex-col gap-4 text-lg">
                                <li className="w-full">
                                    <Link
                                        to="/"
                                        className="w-full px-4 py-2 cursor-pointer hover:bg-slate-800"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li className="w-full">
                                    <Link
                                        to="/search"
                                        className="w-full px-4 py-2 cursor-pointer hover:bg-slate-800"
                                    >
                                        Search
                                    </Link>
                                </li>
                            </ul>
                        </nav> */}
                        <div className="cursor-pointer w-[40px] h-[24px] flex place-items-center">
                            <span className="w-[40px] h-[3px] block bg-white relative rounded-full before:content-[''] before:w-[40px] before:h-[3px] before:bg-white before:absolute before:top-[-12px] before:left-0 before:rounded-full after:content-[''] after:w-[40px] after:h-[3px] after:bg-white after:absolute after:bottom-[-12px] after:left-0 after:rounded-full"></span>
                        </div>

                        <Link to="/" className="max-w-[150px] cursor-pointer">
                            <img src={moviehub} alt="Logo MovieHub" />
                        </Link>
                    </div>
                    <div>
                        <button className="cursor-pointer">Dark</button>
                    </div>
                </div>
            </header>

            <main
                style={{
                    backgroundImage: `radial-gradient(#62748e80, #0f172b80), url(${texture})`,
                }}
                className="bg-cover bg-center bg-no-repeat pb-4"
            >
                <Outlet />
            </main>
        </>
    );
}

export default MainLayout;
