import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/bg8.jpg'; // Adjust the path based on your file structure

export default function AllLiveStreams() {
  const [mandirs, setMandirs] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMandirs = async () => {
      try {
        const res = await fetch('/backend/auth/getalltemples', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || 'Failed to fetch temples');
        }
        const data = await res.json();
        setMandirs(data.temples);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchMandirs();
  }, []);

  const handleCardClick = (mandir) => {
    navigate('/watch-livestream', { state: { mandir } });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center p-4"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="relative flex items-center mb-6">
        <button
          className="relative z-10 mt-4 bg-red-500 text-white text-sm font-medium py-2 px-4 rounded hover:bg-red-600 transition"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>

        <h1 className="absolute inset-x-0 text-center font-bold text-3xl text-black drop-shadow-md">
          All Temples
        </h1>
      </div>

      {error && <p className="text-red-700">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
        {mandirs.map((mandir) => (
          <div
            key={mandir._id}
            className="border p-5 rounded-lg shadow-lg bg-yellow-200 hover:bg-yellow-300 hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => handleCardClick(mandir)}
          >
            <h3 className="font-bold text-lg text-gray-800">{mandir.username}</h3>
            <p className="text-gray-700">{mandir.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
