import React, { useEffect, useState } from "react";
import images from "../assets/bg6.png";
import web_background from "../assets/bg8.jpg";
import { useNavigate } from "react-router-dom";

export default function ViewAllBookings() {
  const [darshanbookings, setDarshanBookings] = useState([]);
  const [servicebookings, setServiceBookings] = useState([]);
  const [error, setError] = useState(null);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDarshanBookings = async () => {
      try {
        const response = await fetch("backend/bhakt/darshan/");
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }
        const data = await response.json();
        setDarshanBookings(data.darshans);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchServiceBookings = async () => {
      try {
        const response = await fetch("backend/bhakt/booking/");
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }
        const data = await response.json();
        setServiceBookings(data.bookings);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchDarshanBookings();
    fetchServiceBookings();
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

  const handleDeleteDarshan = async (darshanId) => {
    setBookingToDelete(darshanId);
    setIsConfirmationVisible(true);
  };

  const handleDeleteService = async (bookingId) => {
    setBookingToDelete(bookingId);
    setIsConfirmationVisible(true);
  };

  const confirmDelete = async () => {
    const bookingId = bookingToDelete;
    setIsConfirmationVisible(false);
    try {
      let res;
      if (darshanbookings.some((booking) => booking._id === bookingId)) {
        res = await fetch("/backend/bhakt/darshan/delete", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ darshanId: bookingId }),
        });
      } else {
        res = await fetch("/backend/bhakt/booking/delete", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ bookingId }),
        });
      }

      if (!res.ok) {
        throw new Error("Failed to delete booking");
      }

      // Update state to remove deleted booking from UI
      if (darshanbookings.some((booking) => booking._id === bookingId)) {
        setDarshanBookings((prevBookings) =>
          prevBookings.filter((booking) => booking._id !== bookingId)
        );
      } else {
        setServiceBookings((prevBookings) =>
          prevBookings.filter((booking) => booking._id !== bookingId)
        );
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const cancelDelete = () => {
    setIsConfirmationVisible(false);
    setBookingToDelete(null);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${web_background})`,
      }}
    >
      <div className="bg-white bg-opacity-0 min-h-screen py-10 px-5">
        <div className="flex items-center mb-8">
          <button
            className="relative z-10 mt-4 bg-red-500 text-white text-sm font-medium py-2 px-4 rounded hover:bg-red-600 transition"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>

          <h1 className="absolute inset-x-0 text-center font-bold text-3xl">
            All Bookings
          </h1>
        </div>
        {error && (
          <div className="text-red-500 text-center mb-4">
            <p>Error: {error}</p>
          </div>
        )}
        <h1 className="my-10 font-bold text-2xl">Darshans:</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10">
          {darshanbookings.map((booking, index) => (
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
                onClick={() => handleDeleteDarshan(booking._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        <h1 className="my-10 font-bold text-2xl">Services:</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10">
          {servicebookings.map((booking, index) => (
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
                <span className="font-medium">Pandit:</span> {booking.pandit}
              </p>
              <p className="text-gray-800 relative z-10">
                <span className="font-medium">Service:</span> {booking.service}
              </p>
              <p className="text-gray-800 relative z-10">
                <span className="font-medium">Date:</span> {booking.date}
              </p>
              <button
                className="relative z-10 mt-4 bg-red-500 text-white text-sm font-medium py-2 px-4 rounded hover:bg-red-600 transition"
                onClick={() => handleDeleteService(booking._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation Modal */}
      {isConfirmationVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold text-center mb-4">
              Are you sure you want to delete this booking?
            </h2>
            <div className="flex justify-around">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                onClick={confirmDelete}
              >
                Confirm
              </button>
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                onClick={cancelDelete}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
