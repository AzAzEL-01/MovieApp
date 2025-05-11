import { useState } from 'react'
import MovieCard from './Components/MovieCard'
import Homepage from './Pages/Homepage'
import {Routes, Route} from 'react-router-dom'
import Favourites from './Pages/Favourites'
import { MovieProvider } from './context/MovieContext'




function App() {

  

  return (
   <>
    <MovieProvider>
    <Routes>
      <Route path='/' element={<Homepage/>} />
      <Route path='/favourites' element={<Favourites/>} />
      </Routes>

    </MovieProvider>
     
     
    </>
  )
}

export default App
