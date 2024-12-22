import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="mx-auto max-w-4xl px-6">
      <div className="my-10 bg-cyan-300 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-wide">
          Welcome to Pooja Pehal
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 focus:bg-gray-700 bg-slate-500 hover:bg-slate-600 gap-8">
          {/* Card 1 */}
          <div className="flex flex-col items-center bg-gradient-to-br from-indigo-100 to-white shadow-lg rounded-2xl p-6 transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:bg-slate-500">
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">
              <Link to="/darshan">Regular Darshan</Link>
            </h2>
            <p className="text-sm text-gray-600 text-justify">
              Experience the serene and divine moments during our regular darshan. Let your soul find peace.
            </p>
          </div>
          {/* Card 2 */}
          <div className="flex flex-col items-center bg-gradient-to-br from-pink-100 to-white shadow-lg rounded-2xl p-6 transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <h2 className="text-2xl font-bold text-pink-700 mb-4">
              <Link to="/events">Special Event</Link>
            </h2>
            <p className="text-sm text-gray-600 text-justify">
              Participate in our vibrant special events filled with joy, devotion, and cultural essence.
            </p>
          </div>
          {/* Card 3 */}
          <div className="flex flex-col items-center bg-gradient-to-br from-green-100 to-white shadow-lg rounded-2xl p-6 transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <h2 className="text-2xl font-bold text-green-700 mb-4">
              <Link to="/donation">Donations</Link>
            </h2>
            <p className="text-sm text-gray-600 text-justify">
              Support the community by contributing to our initiatives. Every donation brings a smile.
            </p>
          </div>
        </div>
        <div className="mt-10">
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-8 rounded-full shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-400">
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}