import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AnimeCard from './AnimeCard';

const TopMangaBar = () => {
  const [mangaData, setMangaData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://kitsu.io/api/edge/manga?page[limit]=10');
        setMangaData(response.data.data); // Store fetched manga data
        setIsLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchData(); // Fetch data when the component is mounted
  }, []); // Run this effect only once on component mount

  if (isLoading) {
    return <div>Loading...</div>; // Display a loading message or spinner
  }

  return (
    <div className="m-4 text-white text-2xl font-semibold ml-16 ">
      <div className="m-4 px-2 border-l-2 border-white">Top Manga :</div>
      <div className="grid grid-cols-1"> {/* Adjust grid columns and gaps */}
        {mangaData.map((manga) => (
            <div className='w-56 m-4'>
          <AnimeCard
            key={manga.id} // Use unique key
            title={manga.attributes.canonicalTitle} // Title from Kitsu
            ImgPath={manga.attributes.posterImage.small} // Use small image for card
            year={manga.attributes.startDate?.slice(0, 4) || 'N/A'} // Handle optional start date
          />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopMangaBar;
