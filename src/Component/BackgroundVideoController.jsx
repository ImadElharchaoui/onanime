import React, { useEffect, useRef } from 'react';

const BackgroundVideoController = ({ muted, volume }) => {
  const videoRef = useRef(null); // Reference to the video element

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = muted; // Set mute based on the `muted` prop
      videoRef.current.volume = volume; // Set volume based on the `volume` prop
    }
  }, [muted, volume]); // Re-run when `muted` or `volume` changes

  return (
    <div className="fixed top-0 left-0 w-full h-screen overflow-hidden" >
      <video
        ref={videoRef} // Reference to the video element
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        
      >
        <source src={`/video/${Math.floor(Math.random() * 6) + 1}.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default BackgroundVideoController;
