import React from 'react';
import { useNavigate } from 'react-router-dom';
import images from '../assets/Langing.jpeg';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div
      className="h-screen bg-cover bg-center flex flex-col items-center justify-center text-white"
      style={{ backgroundImage: `url(${images})` }}
    >
      {/* Title and Tagline */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to Pooja Pehal
        </h1>
        <p className="text-lg md:text-2xl font-medium">
          A pathway to divine Worship
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
  );
}

export default LandingPage;
