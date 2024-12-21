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
    <div>
      {/* Slider */}
      <ImageSlider slides={slides} />

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        {/* Title and Tagline in a white box */}
        <div
          className="text-center mb-10 p-6 rounded-lg shadow-lg"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.8)", // White background with 80% transparency
            color: "#002", // Black text for contrast
            maxWidth: "90%", // Restrict width for better readability
          }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
          🙏Welcome to Pooja Pehal🙏
          </h1>
          <p className="text-lg md:text-2xl font-medium">
          Bridging Devotion and Technology – Your Gateway to Divine Experiences
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/sign-in")}
            className="px-6 py-3 text-lg font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105"
          >
            Admin
          </button>
          <button
            onClick={() => navigate("/bhakt/sign-in")}
            className="px-6 py-3 text-lg font-semibold text-white bg-green-500 rounded-lg shadow-md hover:bg-green-600 transition-transform transform hover:scale-105"
          >
            Bhakt
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
