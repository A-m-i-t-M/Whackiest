import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Darshan() {
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

  console.log(error);
  console.log(mandirs);

  const handleCardClick = (mandir) => {
    navigate('/mandirbook', { state: { mandir } });
  };

  return (
    <div
      // style={{
      //   background: 'linear-gradient(to bottom right, #f9f7f1, #eae4dc)',
      //   minHeight: '100vh',
      //   padding: '20px',
      // }}
      className=' bg-neutral-300 dark:bg-slate-800 min-h-screen py-10 px-5'
    >
      <div className="relative flex items-center mb-8">
        <button
          className="absolute left-0 bg-red-500 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-red-600 transition"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
        <h1 className="w-full text-center font-extrabold text-4xl text-gray-800 dark:text-purple-300 tracking-wide">
          All Temples
        </h1>
      </div>

      {error && <p className="text-red-700 text-center">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mandirs.map((mandir) => (
          <div
            key={mandir._id}
            className="bg-[#FFFAE3] border border-gray-200 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 p-6 cursor-pointer bg-gradient-to-br from-yellow-300 to-orange-300  dark:bg-gradient-to-br dark:from-slate-700 dark:to-slate-500"
            onClick={() => handleCardClick(mandir)}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-orange-300">{mandir.username}</h3>
            </div>
            <p className="text-gray-600 text-base dark:text-neutral-200">{mandir.description}</p>
            <div className="mt-4">
              <button className="bg-orange-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-orange-700 transition-colors duration-300">
                Book Visit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
