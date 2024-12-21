import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from React Router

export default function ViewAdminStuff() {
  const [darshanbookings, setDarshanBookings] = useState([]);
  const [servicebookings, setServiceBookings] = useState([]);
  const [error, setError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    const fetchDarshanBookings = async () => {
      try {
        const response = await fetch("backend/darshans/admin/");
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
        const res = await fetch("backend/bookings/admin");
        if (!res.ok) {
          throw new Error("Failed to fetch the Services");
        }
        const data = await res.json();
        setServiceBookings(data.bookings);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchDarshanBookings();
    fetchServiceBookings();
  }, []);

  const handleDeleteDarshan = (darshanId) => {
    setSelectedBookingId(darshanId);
    setIsDialogOpen(true);
  };

  const handleDeleteService = (bookingId) => {
    setSelectedBookingId(bookingId);
    setIsDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      let res;
      if (darshanbookings.some((booking) => booking._id === selectedBookingId)) {
        res = await fetch("/backend/darshans/admin/cancel", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ darshanId: selectedBookingId }),
        });
      } else {
        res = await fetch("/backend/bookings/admin/cancel", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ bookingId: selectedBookingId }),
        });
      }

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      if (darshanbookings.some((booking) => booking._id === selectedBookingId)) {
        setDarshanBookings((prev) =>
          prev.filter((booking) => booking._id !== selectedBookingId)
        );
      } else {
        setServiceBookings((prev) =>
          prev.filter((booking) => booking._id !== selectedBookingId)
        );
      }

      setIsDialogOpen(false);
    } catch (error) {
      setError(error.message);
      setIsDialogOpen(false);
    }
  };

  const cancelDelete = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-orange-100 py-10 px-5">
      <button
        onClick={() => navigate(-1)} // Navigate back to the previous page
        className="mb-6 bg-red-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Go Back
      </button>

      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        All Bookings
      </h1>
      {error && (
        <div className="text-red-500 text-center mb-4">
          <p>Error: {error}</p>
        </div>
      )}

      <h1 className="font-bold text-2xl ml-4 text-gray-800">Darshans</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {darshanbookings.map((booking, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-yellow-200 to-orange-300 shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              User Name: {booking.userName}
            </h2>
            <p className="text-gray-700">
              <span className="font-medium">Date:</span> {booking.date}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Time:</span> {booking.time}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Item:</span> {booking.item}
            </p>
            <button
              className="mt-4 w-full sm:w-auto bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
              onClick={() => handleDeleteDarshan(booking._id)}
            >
              Cancel
            </button>
          </div>
        ))}
      </div>

      <h1 className="font-bold text-2xl ml-4 text-gray-800 mt-8">Services</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {servicebookings.map((booking, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-yellow-200 to-orange-300 shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              User Name: {booking.userName}
            </h2>
            <p className="text-gray-700">
              <span className="font-medium">Service:</span> {booking.service}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Pandit:</span> {booking.pandit}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Date:</span> {booking.date}
            </p>
            <button
              className="mt-4 w-full sm:w-auto bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
              onClick={() => handleDeleteService(booking._id)}
            >
              Cancel
            </button>
          </div>
        ))}
      </div>

      {isDialogOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-gradient-to-br from-yellow-200 to-orange-300 p-6 rounded-lg shadow-lg w-11/12 sm:w-80">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Do you want to delete it?
            </h2>
            <div className="flex flex-col sm:flex-row justify-around space-y-4 sm:space-y-0">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                onClick={confirmDelete}
              >
                Yes
              </button>
              <button
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                onClick={cancelDelete}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
