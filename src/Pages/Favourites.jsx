import React from 'react'
import { useMovieContext } from '../context/MovieContext'
import MovieCard from '../Components/MovieCard'
import { Link } from 'react-router-dom';

const Favourites = () => {

  const { favourites } = useMovieContext();

  return (
    <div>
      <nav className="container w-full mx-auto p-4 bg-black bg-opacity-90 text-white shadow-md sticky top-0 z-50">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold hover:text-red-500 transition-all duration-300 ease-in-out">Movie App</Link>
          <Link to="/" className="text-lg hover:text-red-500 transition-all duration-300 ease-in-out">Home</Link>
        </div>
      </nav>
      {favourites.length === 0 ? (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex items-center justify-center">
          <h1 className="text-2xl text-center px-4">No favourites added yet!</h1>
        </div>
      ) : (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
          <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6 text-center sm:text-left">My Favourites</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {favourites.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Favourites;
