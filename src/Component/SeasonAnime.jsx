import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AnimeCard from './AnimeCard';

const SeasonAnime = () => {
  const [animeData, setAnimeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the current season's anime from Kitsu (example endpoint)
        const response = await axios.get('https://kitsu.io/api/edge/trending/anime?limit=20'); // Fetch 20 trending anime
        setAnimeData(response.data.data); // Store the fetched data
        setIsLoading(false); // Loading complete
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error); // Store error information
        setIsLoading(false); // Complete loading even on error
      }
    };

    fetchData(); // Fetch data when the component mounts
  }, []); // Effect runs only once on component mount

  if (isLoading) {
    return <div>Loading...</div>; // Display loading message or spinner
  }

  if (error) {
    return <div>Error fetching data. Please try again later.</div>; // Handle error state
  }

  return (
    <div className="m-4 text-white text-2xl font-semibold">
      <div className="m-4 px-2 border-l-2 border-white">Trending Anime:</div>
      <div className="grid grid-cols-4 gap-4"> {/* Define grid layout */}
        {animeData.map((anime, index) => (
          <div key={index} className="w-56 m-4"> {/* Consistent spacing */}
            <AnimeCard
              ImgPath={anime.attributes.posterImage?.original} // Path to the image
              title={anime.attributes.canonicalTitle} // Anime title
              id={anime.id} // Anime ID
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeasonAnime;
