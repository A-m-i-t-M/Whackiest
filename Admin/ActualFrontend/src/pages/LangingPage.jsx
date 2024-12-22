import React from 'react';
import { useNavigate } from 'react-router-dom';
import ImageSlider from './ImageSlider';

// Slider images
import bg5 from '../assets/landing_pages_pics/L1.jpg';
import bg6 from '../assets/landing_pages_pics/L3.jpg';
import bg4 from '../assets/Langing.jpeg';
import bg3 from '../assets/landing_pages_pics/L6.jpg';
import bg2 from '../assets/landing_pages_pics/L7.jpg';

function LandingPage() {
  const navigate = useNavigate();

  const slides = [
    { url: bg5, title: "Beach" },
    { url: bg6, title: "Boat" },
    { url: bg4, title: "Forest" },
    { url: bg3, title: "Mountain" },
    { url: bg2, title: "Road" },
  ];

  return (
    <div className="relative">
      {/* Slider */}
      <ImageSlider slides={slides} />

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
        {/* Title and Tagline in Glassmorphism style */}
        <div
          className="w-full max-w-3xl bg-gray-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-60 border border-gray-100 text-center mb-10 p-6 shadow-lg"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            🙏Welcome to Pooja Pehal🙏
          </h1>
          <p className="text-base sm:text-lg md:text-2xl font-medium">
            Bridging Devotion and Technology – Your Gateway to Divine Experiences
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center items-center">
          <button
            onClick={() => navigate("/sign-in")}
            className="px-6 py-3 text-lg font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105 w-full sm:w-auto"
          >
            Admin
          </button>
          <button
            onClick={() => navigate("/bhakt/sign-in")}
            className="px-6 py-3 text-lg font-semibold text-white bg-green-500 rounded-lg shadow-md hover:bg-green-600 transition-transform transform hover:scale-105 w-full sm:w-auto"
          >
            Bhakt
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
