import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Anime from './Pages/Anime';

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
            
                <Route index path="/" element={<Home />} />
                <Route index path="/anime/:id" element={<Anime />} />


            
        </Routes>
        </BrowserRouter>
  )
}

export default App