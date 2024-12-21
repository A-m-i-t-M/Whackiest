import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import webBackground from '../assets/bg8.jpg'; // Importing the background image

export default function WatchLiveStream() {
  const location = useLocation();
  const mandir = location.state?.mandir;
  const navigate = useNavigate();

  const [urls, setUrls] = useState('');

  useEffect(() => {
    const getVideo = async () => {
      try {
        const res = await fetch("backend/livestream/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ mandirId: mandir._id })
        });

        if (!res.ok) {
          console.log("Some error happened during the API call");
        }

        const data = await res.json();
        setUrls(data.live[0].link);
      } catch (error) {
        console.log("Couldn't get the video link, boss");
      }
    };

    getVideo();
  }, [mandir]);

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${webBackground})` }}
    >
      <div className="bg-white bg-opacity-50 min-h-screen py-10 px-5">
        <div className="max-w-4xl mx-auto">
          <button
            className="relative z-10 mt-4 bg-red-500 text-white text-sm font-medium py-2 px-4 rounded hover:bg-red-600 transition"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>

          <h1 className="text-center text-3xl font-bold mt-6">Watch Live Stream</h1>

          {urls ? (
            <div className="mt-10 bg-white rounded-lg shadow-lg p-5">
              <iframe
                width="100%"
                height="515"
                src={urls}
                title="Live Stream"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>
          ) : (
            <p className="text-center mt-4">Loading live stream...</p>
          )}
        </div>
      </div>
    </div>
  );
}
