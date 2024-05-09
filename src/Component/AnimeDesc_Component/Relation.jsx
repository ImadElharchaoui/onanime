import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Relation = () => {
  const { id: animeId } = useParams(); // Get anime ID from URL
  const [relations, setRelations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeRelation, setActiveRelation] = useState(null); // Active relation type
  const [relationDetails, setRelationDetails] = useState([]); // Store additional relation details

  // Fetch relations from Kitsu API
  useEffect(() => {
    const fetchRelations = async () => {
      try {
        // Fetch related installments
        const response = await axios.get(`https://kitsu.io/api/edge/anime/${animeId}/relationships/installments`);

        const relatedData = response.data.data; // Store the main data
        setRelations(relatedData); // Update state

        // Fetch additional data for each related anime
        const details = await Promise.all(
          relatedData.map(async (rel) => {
            // Ensure that the "related" link exists
            if (rel.links && rel.links.related) {
              const res = await axios.get(rel.links.related); // Fetch additional data
              if (res.data.data) {
                const updatedAnimes = await Promise.all(
                  res.data.data.map(async (anime) => {
                    // Fetch the additional details for each anime
                    const animeDetails = await axios.get(`https://kitsu.io/api/edge/anime/${anime.id}`);
                    const image = animeDetails.data.data.attributes.posterImage?.original; // Get the original image

                    return { ...anime, image }; // Add the image to the anime
                  })
                );

                return { ...rel, entry: updatedAnimes }; // Return updated relations with images
              }
            }

            return rel; // If "related" doesn't exist, return the original relation
          })
        );

        setRelationDetails(details); // Store updated relation details
        setIsLoading(false); // Complete loading
      } catch (err) {
        console.error('Error fetching relations:', err);
        setError(err); // Handle errors
        setIsLoading(false);
      }
    };

    fetchRelations(); // Fetch data when the component mounts
  }, [animeId]);

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
        Error loading related anime. Please try again later.
      </div>
    );
  }

  const relationTypes = [...new Set(relations.map((rel) => rel.type))]; // Extract unique relation types

  return (
    <div className="flex min-h-screen">
      {/* Sidebar with relation types */}
      <div className="w-1/4 bg-gray-700 text-white p-4">
        <h2 className="text-xl mb-4">Relations</h2>
        <ul>
          {relationTypes.map((type, index) => (
            <li
              key={index}
              className={`cursor-pointer mb-2 p-2 rounded ${activeRelation === type ? 'bg-blue-600' : 'bg-gray-800'}`}
              onClick={() => setActiveRelation(type)} // Set active relation type
            >
              {type}
            </li>
          ))}
        </ul>
      </div>

      {/* Content for the selected relation type */}
      <div className="flex-1 p-8 text-white bg-gray-800">
        <h2 className="text-2xl mb-4">{activeRelation}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md-grid-cols-3 lg-grid-cols-4 gap-4">
          {relationDetails
            .filter((rel) => rel.type === activeRelation) // Filter by selected relation type
            .map((relation, index) => (
              <div key={index} className="p-4 bg-gray-700 rounded-lg grid grid-cols-2">
                {relation.map((anime) => (
                  <div key={anime.id} className="mb-4">
                    <img
                      src={anime.image} // Display the image fetched from details
                      alt={anime.attributes.canonicalTitle || 'Anime'}
                      className="w-full rounded"
                    />
                    <p>{anime.attributes.canonicalTitle}</p> {/* Display the canonical title */}
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Relation;
