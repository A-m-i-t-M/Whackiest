import React, { useEffect, useState } from "react";
import images from "../assets/bg6.png";
import web_background from "../assets/bg8.jpg";

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

  const getCardStyles = (mandirName) => {
    switch (mandirName) {
      case "Mandir A":
        return "bg-red-100 border-red-500";
      case "Mandir B":
        return "bg-yellow-100 border-yellow-500";
      case "Mandir C":
        return "bg-blue-100 border-blue-500";
      default:
        return "bg-gray-100 border-gray-500";
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${web_background})`,
      }}
    >
      <div className="bg-white bg-opacity-0 min-h-screen py-10 px-5">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          All Bookings
        </h1>
        {error && (
          <div className="text-red-500 text-center mb-4">
            <p>Error: {error}</p>
          </div>
        )}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking, index) => (
            <div
              key={index}
              className={`relative shadow-lg rounded-lg p-6 transition duration-300 border-l-4 ${getCardStyles(
                booking.mandirName
              )} group`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-40 rounded-lg"
                style={{ backgroundImage: `url(${images})` }}
              ></div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2 relative z-10">
                Mandir Name: {booking.mandirName}
              </h2>
              <p className="text-gray-800 relative z-10">
                <span className="font-medium">Date:</span> {booking.date}
              </p>
              <p className="text-gray-800 relative z-10">
                <span className="font-medium">Time:</span> {booking.time}
              </p>
              <button
                className="relative z-10 mt-4 bg-red-500 text-white text-sm font-medium py-2 px-4 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
