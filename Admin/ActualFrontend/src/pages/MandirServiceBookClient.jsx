import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ServiceBooking() {
  const location = useLocation();
  const service = location.state?.service;
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    service: service?._id || '',
    serviceName: service?.name || '',
    date: '',
    time: '',
    type: '',
    item: '',
  });

  const [isBookingDone, setIsBookingDone] = useState(false); // State for dialog box

  useEffect(() => {
    const fetchItems = async () => {
      if (service?._id) {
        try {
          const response = await fetch('/backend/items', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ serviceId: service._id }),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();

          if (Array.isArray(data.items)) {
            setItems(data.items);
          } else {
            console.error('Invalid data format received:', data);
          }
        } catch (error) {
          console.error('Error fetching items:', error);
        }
      }
    };

    fetchItems();
  }, [service]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await fetch('/backend/service/booking/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service: formData.service,
          serviceName: formData.serviceName,
          date: formData.date,
          time: formData.time,
          type: formData.type,
          item: formData.item,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log('Form submitted successfully:', data);

      setIsBookingDone(true); // Show the dialog box
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(to bottom right, #fdf6e4, #f9e0d9)",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div className="max-w-6xl mx-auto my-12 p-10 bg-yellow-50 shadow-xl rounded-lg border border-orange-300 relative">
        <div className="relative flex items-center mb-8">
          <button
            className="absolute left-0 bg-orange-500 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-orange-600 transition"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
          <h1 className="w-full text-center font-extrabold text-4xl text-orange-700 tracking-wide">
            Service Booking
          </h1>
        </div>

        {/* Display Service Information */}
        <div className="mb-6 bg-orange-100 p-4 rounded-lg shadow-md border border-orange-300">
          <h2 className="text-orange-800 font-semibold text-lg">
            Service Name: <span className="font-bold">{formData.serviceName}</span>
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label
                htmlFor="date"
                className="block text-orange-800 font-medium mb-2"
              >
                Date:
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-orange-300 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-orange-500 transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="time"
                className="block text-orange-800 font-medium mb-2"
              >
                Timeslot:
              </label>
              <select
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-orange-300 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-orange-500 transition-all"
              >
                <option value="">Select a timeslot</option>
                <option value="slot1">Slot 1</option>
                <option value="slot2">Slot 2</option>
                <option value="slot3">Slot 3</option>
                <option value="slot4">Slot 4</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label
                htmlFor="type"
                className="block text-orange-800 font-medium mb-2"
              >
                Type:
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-orange-300 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-orange-500 transition-all"
              >
                <option value="">Select Type</option>
                <option value="Personal">Personal</option>
                <option value="Group">Group</option>
                <option value="Senior Citizen">Senior Citizen</option>
                <option value="Women Only">Women Only</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="item"
                className="block text-orange-800 font-medium mb-2"
              >
                Items:
              </label>
              <select
                id="item"
                name="item"
                value={formData.item}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-orange-300 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-orange-500 transition-all"
              >
                <option value="">Select an Item</option>
                {items.map((item) => (
                  <option key={item._id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white text-lg font-semibold py-4 rounded-lg shadow-md hover:bg-orange-600 transition-all"
          >
            Book Now
          </button>
        </form>

       
        {isBookingDone && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-yellow-50 p-8 rounded-lg shadow-lg text-center border border-orange-300">
              <h2 className="text-2xl font-semibold text-orange-700 mb-4">
                Booking Confirmed!
              </h2>
              <p className="text-gray-700">
                Your booking has been successfully completed.
              </p>
              <button
                onClick={() => setIsBookingDone(false)}
                className="mt-6 bg-orange-500 text-white py-2 px-6 rounded-lg hover:bg-orange-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
