import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const res = await fetch('/backend/auth/signout');
      const data = await res.json();

      if (data.success === false) {
        console.log(data.error);
      }

      console.log('Signed out');
      navigate('/');
    } catch (error) {
      console.log("Couldn't sign out");
    }
  };

  const handleViewBooking = async () => {
    try {
      navigate('/view-bookings');
    } catch (error) {
      console.log("Can't check bookings");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url('https://img.freepik.com/premium-photo/women-indian-tradition-dresss-holding-diya-her-hand-happy-diwali-design-generative-ai_852336-22380.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="w-full max-w-6xl px-6 bg-white bg-opacity-50 py-10 rounded-lg">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-12 tracking-wide">
            Welcome to Pooja Pehal
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Card 1 */}
            <div className="flex flex-col items-center bg-indigo-100 bg-opacity-70 shadow-lg rounded-2xl p-8 transform transition duration-300 hover:scale-105 hover:shadow-2xl h-80">
              <h2 className="text-3xl font-extrabold text-indigo-900 mb-6">
                <Link to="/darshan">Regular Darshan</Link>
              </h2>
              <p className="text-base font-semibold text-indigo-800 text-justify">
                Experience the serene and divine moments during our regular darshan. Let your soul find peace.
              </p>
            </div>
            {/* Card 2 */}
            <div className="flex flex-col items-center bg-pink-100 bg-opacity-70 shadow-lg rounded-2xl p-8 transform transition duration-300 hover:scale-105 hover:shadow-2xl h-80">
              <h2 className="text-3xl font-extrabold text-pink-900 mb-6">
                <Link to="/events">Special Event</Link>
              </h2>
              <p className="text-base font-semibold text-pink-800 text-justify">
                Participate in our vibrant special events filled with joy, devotion, and cultural essence.
              </p>
            </div>
            {/* Card 3 */}
            <div className="flex flex-col items-center bg-green-100 bg-opacity-70 shadow-lg rounded-2xl p-8 transform transition duration-300 hover:scale-105 hover:shadow-2xl h-80">
              <h2 className="text-3xl font-extrabold text-green-900 mb-6">
                <Link to="/donation">Donations</Link>
              </h2>
              <p className="text-base font-semibold text-green-800 text-justify">
                Support the community by contributing to our initiatives. Every donation brings a smile.
              </p>
            </div>
          </div>
          <div className="mt-12 flex flex-row justify-center gap-4">
            <button
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-10 rounded-full shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-400"
              onClick={handleSignOut}
            >
              <b>Sign Out</b>
            </button>
            <button
              className="bg-orange-700 text-white py-4 px-10 rounded-full shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-orange-400"
              onClick={handleViewBooking}
            >
              <b>View Bookings</b>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
