import React from 'react';
import {useNavigate} from 'react-router-dom'

const AnimeCard = ({ ImgPath, title, year ,id }) => {
  const navigate = useNavigate()
  return (
    <div className="relative w-60 h-80 rounded-xl overflow-hidden shadow-lg" onClick={()=>{navigate(`/anime/${id}`)}}>
      {/* Background image with cover */}
      <img
        src={ImgPath}
        alt={title}
        className="w-full h-full object-cover hover:scale-105 duration-150" // Ensures the image covers the card
      />

      {/* Overlay with gradient for readability */}
      <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black to-transparent">
        {/* Position the text at the bottom */}
        <p className="text-white text-xl font-bold h-8 overflow-hidden">{title}</p>
        <p className="text-gray-300 text-sm">{year}</p>
      </div>
    </div>
  );
};

export default AnimeCard;
