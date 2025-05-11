import React, { use } from 'react';
import MovieCard from '../Components/MovieCard';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { searchMovies, getPopularMovies } from '../services/api';

const Homepage = () => {
    const [input, setInput] = useState('');
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const PopularMovies = await getPopularMovies();
                setMovies(PopularMovies);
            } catch (error) {
                console.error('Error fetching movies:', error);
                setError('Failed to fetch movies');
            } finally {
                setLoading(false);
            }
        };
        fetchMovies();
    }, []);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (!input.trim()) 
            return alert('Please enter a search term');
        setLoading(true);

        try{    
            const fetchMovies = async () => {
                const searchResults = await searchMovies(input);
                setMovies(searchResults);
            };
            fetchMovies();

        }
        catch (error) {
            console.error('Error searching movies:', error);
            setError('Failed to fetch movies');
        } finally {
            setLoading(false);
        }

        setInput('');
        
        
    };

    return (
        <div className="min-h-full bg-gradient-to-b from-gray-900 to-black text-white">
            <nav className="container w-screen mx-auto p-4 bg-black bg-opacity-90 text-white shadow-lg sticky top-0 z-50">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-bold">
                        <Link to="/" className="hover:text-red-500 transition-colors duration-300">
                            Movie App
                        </Link>
                    </h1>
                    <h1 className="text-xl font-bold">RL</h1>
                </div>
                <ul className="flex justify-between items-center">
                    <div className="flex space-x-6">
                        <li>
                            <Link to="/" className="hover:text-red-500 transition-colors duration-300">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/favourites" className="hover:text-red-500 transition-colors duration-300">
                                Favourites
                            </Link>
                        </li>
                    </div>
                    <li>
                        <form
                            onSubmit={handleSubmit}
                            className="flex items-center space-x-2"
                        >
                            <input
                                className="bg-gray-800 rounded shadow outline-none h-10 px-4 text-white w-full max-w-xs placeholder-gray-400 focus:ring-2 focus:ring-red-500 transition-all duration-300"
                                type="text"
                                placeholder="Search for movies..."
                                value={input}
                                onChange={handleInputChange}
                            />
                            <button
                                type="submit"
                                className="hover:scale-110 transition-transform duration-300"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width="30"
                                    height="30"
                                    viewBox="0 0 24 24"
                                    fill="white"
                                >
                                    <path d="M 9 2 C 5.1458514 2 2 5.1458514 2 9 C 2 12.854149 5.1458514 16 9 16 C 10.747998 16 12.345009 15.348024 13.574219 14.28125 L 14 14.707031 L 14 16 L 20 22 L 22 20 L 16 14 L 14.707031 14 L 14.28125 13.574219 C 15.348024 12.345009 16 10.747998 16 9 C 16 5.1458514 12.854149 2 9 2 z M 9 4 C 11.773268 4 14 6.2267316 14 9 C 14 11.773268 11.773268 14 9 14 C 6.2267316 14 4 11.773268 4 9 C 4 6.2267316 6.2267316 4 9 4 z"></path>
                                </svg>
                            </button>
                        </form>
                    </li>
                </ul>
            </nav>
            <div className="container mx-auto p-4">
                {loading ? (
                    <p className="text-center text-gray-400 animate-pulse">Loading movies...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {movies
                            .filter((movie) =>
                                movie.title.toLowerCase().includes(input.toLowerCase())
                            )
                            .map((movie) => (
                                <MovieCard movie={movie} key={movie.id} />
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Homepage;
