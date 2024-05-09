import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import AnimeCard from './AnimeCard';
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from 'react-icons/io';

const RecommendAnimeBar = () => {
  const [animeData, setAnimeData] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch anime recommendations from Kitsu (example endpoint)
        const response = await axios.get('https://kitsu.io/api/edge/anime?page[limit]=15'); // Fetch 15 items
        setAnimeData(response.data.data); // Store the fetched data
        console.log('rec:', animeData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Fetch data when the component mounts
  }, []);

  if (!animeData.length) {
    return <div>Loading...</div>; // Display a loading message if no data
  }

  // Map the fetched data to AnimeCard components
  const animeCards = animeData.map((anime, index) => (
    <div key={index} className="w-56 mx-4">
      <AnimeCard
        ImgPath={anime.attributes.posterImage.original} // Path to the image
        title={anime.attributes.canonicalTitle} // Get the anime's title
        id={anime.id} // Unique ID
      />
    </div>
  ));

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' }); // Scroll right
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' }); // Scroll left
    }
  };

  return (
    <div className="relative text-white flex items-center">
      {/* Title above the list */}
      <div className="absolute -top-16 left-4">
        <p className="text-4xl font-bold">Recommendations :</p>
      </div>

      {/* Button to scroll left */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 p-2 bg-gray-800 bg-opacity-75 hover:bg-gray-700 rounded-full z-10"
      >
        <IoMdArrowRoundBack />
      </button>

      {/* Scrollable container for the anime cards */}
      <div
        className="flex flex-row overflow-x-auto scroll-smooth"
        ref={scrollRef}
        style={{
          scrollbarWidth: 'none', // Hide scrollbar in Firefox
          WebkitOverflowScrolling: 'touch', // Enable smooth scrolling on touch devices
        }}
      >
        {animeCards}
      </div>

      {/* Button to scroll right */}
      <button
        onClick={scrollRight}
        className="absolute right-0 p-2 bg-gray-800 bg-opacity-75 hover:bg-gray-700 rounded-full z-10"
      >
        <IoMdArrowRoundForward />
      </button>
    </div>
  );
};

export default RecommendAnimeBar;
