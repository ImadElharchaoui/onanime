import React, { useState } from 'react';
import { GoMute, GoUnmute } from 'react-icons/go';
import Navbar from '../Component/Navbar';
import RecommendAnimeBar from '../Component/RecommendAnimeBar';
import BackgroundVideoController from '../Component/BackgroundVideoController';
import SeasonAnime from '../Component/SeasonAnime';
import TopMangaBar from '../Component/TopMangaBar';

const Home = () => {
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    setMuted(!muted); // Toggle mute state
  };

  return (
    <div className="relative min-h-screen w-full bg-gray-800 font-rowdies"> 
      <BackgroundVideoController muted={muted} volume={0.2} />

      {/* Mute/Unmute Button */}
      <button
        onClick={toggleMute}
        className="absolute top-24 left-10 p-2 bg-gray-800 rounded-full z-30"
      >
        {!muted ? <GoUnmute className="text-white text-2xl" /> : <GoMute className="text-white text-2xl" />}
      </button>

      {/* Main Content with Navbar */}
      <div className="relative z-10 flex flex-col overflow-y-auto"> 
        <Navbar />
      </div>

      {/* SeasonAnime with Padding to Separate from Navbar */}
      

      {/* Footer with RecommendAnimeBar */}
      <div className="absolute bottom-0 w-full text-white p-2 text-center">
        <RecommendAnimeBar />
      </div>

      <div className="absolute flex top-full bg-gray-800 w-full"> 
      <div>
        <SeasonAnime />
      </div>
      <div>
        <TopMangaBar />
      </div>
      </div>
    </div>
  );
};

export default Home;
