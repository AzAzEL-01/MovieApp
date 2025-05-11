import { createContext, useContext, useState, useEffect } from "react";

const MovieContext = createContext();

export  const useMovieContext = () => useContext(MovieContext);
export const MovieProvider =({children}) => {
    const[favourites, setFavourites] = useState([]);

    useEffect(() => {
        const storedFavourites = JSON.parse(localStorage.getItem('favourites'));
        if (storedFavourites) {
            setFavourites(storedFavourites);
        }
        
    },[]);

    useEffect(() => {
        localStorage.setItem('favourites', JSON.stringify(favourites));
    },[favourites]);

    const addToFavourites = (movie) => {
        if (!favourites.some((fav) => fav.id === movie.id)) {
            setFavourites((prev) => [...prev, movie]);
        }
    }

    const removeFromFavourites = (movie) => {
        setFavourites((prev) => prev.filter((fav) => fav.id !== movie.id));
    }

    const isMovieInFavourites = (movie) => {
        return favourites.some((fav) => fav.id === movie.id);
    }

    const contextValue = {
        favourites,
        addToFavourites,
        removeFromFavourites,
        isMovieInFavourites
    }




    return <MovieContext.Provider value={contextValue} >
        {children}  
    </MovieContext.Provider>

}
