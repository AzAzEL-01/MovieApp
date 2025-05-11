import React from 'react'
import { useMovieContext } from '../context/MovieContext'

const MovieCard = ({movie}) => {
    const {addToFavourites, removeFromFavourites, isMovieInFavourites} = useMovieContext();
    const isFavourite = isMovieInFavourites(movie);

    const onFavouriteClick =(e)=>{
        e.preventDefault();
        if (isFavourite) {
            removeFromFavourites(movie);
        } else {
            addToFavourites(movie);
        }

    }
return (
    <div className="flex justify-center items-center p-4">
        <div className="max-w-xs w-full h-full sm:w-80 p-4 m-4 rounded-lg transform transition-transform duration-300 hover:scale-105 shadow-lg shadow-black bg-gray-800 text-white">
            <div className="relative">
                <img
                    className="w-full min-h-[200px] sm:min-h-[300px] rounded-md object-cover"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt="Movie Poster"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-md"></div>
                <div className="absolute top-4 right-4">
                    <button
                        className={`p-2 bg-gray-500 text-white rounded-full hover:bg-red-700 transition-all duration-300 shadow-md ${
                            isFavourite ? "fill-red-500" : ""
                        }`}
                        onClick={onFavouriteClick}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill={isFavourite ? "red" : "none"}
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="movie-info mt-4 text-center">
                <h3 className="text-lg font-semibold truncate">{movie.title}</h3>
                <p className="text-gray-400 text-sm">{movie.releaseDate?.split("-")[0]}</p>
            </div>
        </div>
    </div>
)}

export default MovieCard;
