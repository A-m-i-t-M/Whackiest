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

  const handleSelectLiveStream = async () => {
    try {
      navigate('/select-livestream');
    } catch (error) {
      console.log("Couldn't get the livestreams");
    }
  };

  const handleFAQ = async()=>{
    try{
      navigate("/discussions");
    }catch(error){
      console.log("Unable to load Q&As"); 
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: "url('https://img.freepik.com/premium-photo/women-indian-tradition-dresss-holding-diya-her-hand-happy-diwali-design-generative-ai_852336-22380.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="w-full max-w-6xl px-4 bg-neutral-200 dark:bg-slate-900 dark:bg-opacity-60 bg-opacity-50 py-8 sm:py-12 rounded-lg">
        <div className="text-center">

          <div className='flex flex-row items-center align-middle'>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-purple-300 mb-8 sm:mb-12 tracking-wide ml-64">
              Welcome to Pooja Pehal
            </h1>
            <button className='py-2 px-4 h-12 ml-48 mb-10 
              bg-gradient-to-br from-yellow-200 to-orange-500 dark:bg-gradient-to-r dark:from-blue-500 dark:to-purple-600 text-slate-900 dark:text-white rounded-full shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-400
            ' onClick={handleFAQ}>FAQs</button>
            {/* 
              bg-gradient-to-br from-yellow-200 to-orange-500 dark:bg-gradient-to-r dark:from-blue-500 dark:to-purple-600 text-slate-900 dark:text-white py-3 px-8 rounded-full shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-400
             */}
          </div>

          {/* Cards Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="flex flex-col items-center bg-indigo-100 bg-opacity-70 shadow-lg rounded-2xl p-6 sm:p-8 transform transition duration-300 hover:scale-105 hover:shadow-2xl">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-indigo-900 mb-4 sm:mb-6">
                <Link to="/darshan">Regular Darshan</Link>
              </h2>
              <p className="text-sm sm:text-base font-semibold text-indigo-800 text-justify">
                Experience the serene and divine moments during our regular darshan. Let your soul find peace.
              </p>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col items-center bg-pink-100 bg-opacity-70 shadow-lg rounded-2xl p-6 sm:p-8 transform transition duration-300 hover:scale-105 hover:shadow-2xl">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-pink-900 mb-4 sm:mb-6">
                <Link to="/events">Special Event</Link>
              </h2>
              <p className="text-sm sm:text-base font-semibold text-pink-800 text-justify">
                Participate in our vibrant special events filled with joy, devotion, and cultural essence.
              </p>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col items-center bg-green-100 bg-opacity-70 shadow-lg rounded-2xl p-6 sm:p-8 transform transition duration-300 hover:scale-105 hover:shadow-2xl">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-green-900 mb-4 sm:mb-6">
                <Link to="/donation">Donations</Link>
              </h2>
              <p className="text-sm sm:text-base font-semibold text-green-800 text-justify">
                Support the community by contributing to our initiatives. Every donation brings a smile.
              </p>
            </div>
          </div>

          {/* Buttons Section */}
          <div className="mt-8 sm:mt-12 flex flex-wrap justify-center gap-4">
            <button
              className=" bg-gradient-to-br from-yellow-200 to-orange-500 dark:bg-gradient-to-r dark:from-blue-500 dark:to-purple-600 text-slate-900 dark:text-white py-3 px-8 rounded-full shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-400"
              onClick={handleSignOut}
            >
              <b>Sign Out</b>
            </button>
            <button
              className=" bg-gradient-to-br from-yellow-200 to-orange-500 dark:bg-gradient-to-r dark:from-blue-500 dark:to-purple-600 text-slate-900 dark:text-white py-3 px-8 rounded-full shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-400"
              onClick={handleViewBooking}
            >
              <b>View Bookings</b>
            </button>
            <button
              className=" bg-gradient-to-br from-yellow-200 to-orange-500 dark:bg-gradient-to-r dark:from-blue-500 dark:to-purple-600 text-slate-900 dark:text-white py-3 px-8 rounded-full shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-400"
              onClick={handleSelectLiveStream}
            >
              <b>LiveStreams</b>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
