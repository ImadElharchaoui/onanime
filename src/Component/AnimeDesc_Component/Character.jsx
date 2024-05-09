import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Character = () => {
  const { id: animeId } = useParams(); // Extract anime ID from route parameters
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacterData = async () => {
      try {
        const characterResponse = await axios.get(
          `https://kitsu.io/api/edge/anime/${animeId}/relationships/castings`
        );

        const castings = characterResponse.data.data;

        // Fetching additional character data for each casting
        const detailedCharacters = await Promise.all(
          castings.map(async (casting) => {
            const characterDetails = await axios.get(
              casting.relationships.character.links.related
            );

            return {
              name: characterDetails.data.data.attributes.name,
              image: characterDetails.data.data.attributes.image?.original,
              role: casting.attributes.role,
            };
          })
        );

        setCharacters(detailedCharacters);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching character data:', err);
        setError(err);
        setIsLoading(false);
      }
    };

    fetchCharacterData(); // Fetch data when the component mounts
  }, [animeId]); // Re-run when `animeId` changes

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
        Error loading character data. Please try again later.
      </div>
    );
  }

  return (
    <div className="p-8 text-white bg-gray-800 min-h-screen">
      <h2 className="text-2xl mb-4">Characters</h2>
      <div className="grid grid-cols-2 sm-grid-cols-3 md-grid-cols-4 gap-4"> 
        {characters.map((character, index) => (
          <div key={index} className="p-4 bg-gray-700 rounded-lg"> 
            {character.image ? (
              <img
                src={character.image} 
                alt={character.name}
                className="w-full rounded hover:scale-105 duration-500"
              />
            ) : (
              <div className="h-40 bg-gray-500 rounded text-center flex items-center justify-center">
                No Image Available
              </div>
            )}
            <p className="mt-2">{character.name}</p> 
            <p className="mt-2 text-sm">{character.role}</p> 
          </div>
        ))}
      </div>
    </div>
  );
};

export default Character;
