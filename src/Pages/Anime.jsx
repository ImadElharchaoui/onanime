import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Component/Navbar';
import BackgroundVideoController from '../Component/BackgroundVideoController';
import Overview from '../Component/AnimeDesc_Component/Overveiw';
import Character from '../Component/AnimeDesc_Component/Character';
import Relation from '../Component/AnimeDesc_Component/Relation';
import { IoStarSharp } from 'react-icons/io5';
import { GrOverview } from 'react-icons/gr';

const Anime = () => {
  const { id: animeId } = useParams();
  const [animeData, setAnimeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // State to manage active tab

  useEffect(() => {
    const fetchAnimeData = async () => {
      try {
        const response = await axios.get(`https://kitsu.io/api/edge/anime/${animeId}`);
        setAnimeData(response.data.data);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching anime data:', err);
        setError(err);
        setIsLoading(false);
      }
    };

    fetchAnimeData();
  }, [animeId]); // Re-fetch when `animeId` changes

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

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview />;
      case 'relation':
        return <Relation  />;
      case 'character':
        return <Character  />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="relative bg-gray-800 h-full font-rowdies w-full">
      <BackgroundVideoController muted={true} volume={0.0} />

      <div className="relative z-10">
        <Navbar />
      </div>

      <div className="absolute top-20 p-8 text-white w-full">
        <div className="w-full grid grid-cols-4 p-8 rounded-3xl bg-gray-800">
          <div className="justify-between items-center w-[300px]">
            <img
              className="rounded-xl mb-10 h-[400px] w-[300px]"
              src={animeData?.attributes?.posterImage?.original}
              alt={animeData?.attributes?.canonicalTitle}
            />
            <a href={animeData?.attributes?.youtubeVideoId ? `https://www.youtube.com/watch?v=${animeData?.attributes?.youtubeVideoId}` : '#'}
               target="_blank" rel="noopener noreferrer"
               className="bg-white text-sm px-10 py-4 rounded-md text-black hover:bg-slate-300 active:bg-slate-600">
              Watch Trailer
            </a>
          </div>

          <div className="ml-8 col-span-3">
            <h1 className="mb-16 text-4xl mt-4">{animeData?.attributes?.canonicalTitle}</h1>
            
            <div className="flex items-center mb-8">
              <IoStarSharp />
              <p className="ml-2">{animeData?.attributes?.averageRating || 'N/A'}</p>
            </div>

            <div className="mb-8">
              <button className={`mr-2 px-4 py-2 rounded ${activeTab === 'overview' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'}`}
                      onClick={() => setActiveTab('overview')}>
                Overview
              </button>
              <button className={`mr-2 px-4 py-2 rounded ${activeTab === 'relation' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'}`}
                      onClick={() => setActiveTab('relation')}>
                Relation
              </button>
              <button className={`mr-2 px-4 py-2 rounded ${activeTab === 'character' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'}`}
                      onClick={() => setActiveTab('character')}>
                Character
              </button>
            </div>

            <div className="mt-8">{renderActiveTab()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Anime;
