import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Overview = () => {
  const { id: animeId } = useParams();
  const [animeData, setAnimeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnimeData = async () => {
      try {
        const response = await axios.get(`https://kitsu.io/api/edge/anime/${animeId}`);
        const kitsuAnime = response.data.data; // Directly access the anime data
        
        if (!kitsuAnime) {
          throw new Error('Anime not found');
        }

        // Fetch related data like genres and studios, if links are present
        const genresLink = kitsuAnime.relationships.genres.links.related;
        const studiosLink = kitsuAnime.relationships.productions.links.related;

        const [genresResponse, studiosResponse] = await Promise.all([
          genresLink ? axios.get(genresLink) : Promise.resolve({ data: { data: [] } }),
          studiosLink ? axios.get(studiosLink) : Promise.resolve({ data: { data: [] } }),
        ]);

        setAnimeData({
          ...kitsuAnime.attributes,
          genres: genresResponse.data.data.map(g => g.attributes.name),
          studios: studiosResponse.data.data.map(s => s.attributes.companyName),
        });

        setIsLoading(false); // Mark loading as complete
      } catch (err) {
        console.error('Error fetching anime data:', err);
        setError(err); // Store error
        setIsLoading(false); // Complete loading
      }
    };

    fetchAnimeData();
  }, [animeId]); // Fetch data on component mount

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        Error loading anime data. Please try again later.
      </div>
    );
  }

  return (
    <div className="relative p-8 bg-gray-900 text-white min-h-screen">
      <div className="flex flex-col sm:flex-row"> 
        <div className="flex-1"> 
          <div>
            <strong>Episodes:</strong> {animeData.episodeCount || 'N/A'}
          </div>
          <div>
            <strong>Genres:</strong> 
            {animeData.genres ? animeData.genres.join(', ') : 'N/A'}
          </div>
          <div>
            <strong>Status:</strong> {animeData.status || 'N/A'}
          </div>
          <div>
            <strong>Year:</strong> {animeData.startDate ? animeData.startDate.slice(0, 4) : 'N/A'}
          </div>
          <div>
            <strong>Episode Length:</strong> {animeData.episodeLength || 'N/A'}
          </div>
          <div>
            <strong>Studio:</strong> 
            {animeData.studios ? animeData.studios.join(', ') : 'N/A'}
          </div>
          <div>
            <strong>Source:</strong> {animeData.source || 'N/A'}
          </div>
        </div>

        <div className="flex-1"> {/* Right side with synopsis/description */}
          <strong>Description:</strong>
          <p>{animeData.synopsis || 'No synopsis available.'}</p> {/* Display synopsis */}
        </div>
      </div>
    </div>
  );
};

export default Overview;
