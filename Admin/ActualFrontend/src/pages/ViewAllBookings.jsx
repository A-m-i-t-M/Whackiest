import React, { useEffect, useState } from 'react'


export default function ViewAllBookings() {

    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchBookings = async () => {
        try {
          const response = await fetch("backend/bhakt/darshan/");
          if (!response.ok) {
            throw new Error("Failed to fetch bookings");
          }
          const data = await response.json();
          setBookings(data.darshans);
        } catch (err) {
          setError(err.message);
        }
      };
  
      fetchBookings();
    }, []);
  
    return (
      <div className="min-h-screen bg-gray-100 py-10 px-5">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-8">All Bookings</h1>
        {error && (
          <div className="text-red-500 text-center mb-4">
            <p>Error: {error}</p>
          </div>
        )}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Mandir Name: {booking.mandirName}
              </h2>
              <p className="text-gray-600">
                <span className="font-medium">Date:</span> {booking.date}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Time:</span> {booking.time}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
}
