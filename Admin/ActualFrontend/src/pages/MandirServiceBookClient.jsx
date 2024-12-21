import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function MandirServiceBookClient() {
  const location = useLocation();
  const mandir = location.state?.mandir;
  const navigate = useNavigate();

  const [pandits, setPandits] = useState([]); // State to store fetched pandits
  const [services, setServices] = useState([]); // State to store fetched services
  const [formData, setFormData] = useState({
    mandir: mandir?._id || '',
    mandirName: mandir?.username || '',
    pandit: '',
    service: '',
    date: '',
  });
  const [isBookingSuccess, setIsBookingSuccess] = useState(false); // State for success message

  useEffect(() => {
    const fetchPurohits = async () => {
      if (mandir?._id) {
        try {
          const response = await fetch('/backend/purohit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: mandir._id }),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          if (Array.isArray(data.purohits)) {
            setPandits(data.purohits);
          }
        } catch (error) {
          console.error('Error fetching pandits:', error);
        }
      }
    };

    const fetchServices = async () => {
      if (mandir?._id) {
        try {
          const response = await fetch('/backend/service', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: mandir._id }),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          if (Array.isArray(data.services)) {
            setServices(data.services);
          }
        } catch (error) {
          console.error('Error fetching services:', error);
        }
      }
    };

    fetchPurohits();
    fetchServices();
  }, [mandir]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await fetch('/backend/bhakt/booking/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mandir: formData.mandir,
          mandirName: formData.mandirName,
          pandit: formData.pandit,
          service: formData.service,
          date: formData.date,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log('Form submitted successfully:', data);
      setIsBookingSuccess(true); // Show success message
    } catch (error) {
      console.log(error);
    }
  };

  const closeDialog = () => {
    setIsBookingSuccess(false); // Close the dialog when the close button is clicked
  };

  return (
    <div className="bg-gradient-to-br from-yellow-50 to-pink-100 min-h-screen p-6">
      <div className="max-w-6xl mx-auto my-12 p-10 bg-yellow-50 shadow-xl rounded-lg border border-orange-300 relative">
        <div className="flex items-center mb-8">
          <button
            className="absolute left-3 bg-orange-500 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-orange-600 transition"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
          <h1 className="w-full text-center font-extrabold text-4xl text-orange-700 tracking-wide">
            Service Booking
          </h1>
        </div>

        <div className="mb-6 bg-orange-100 p-4 rounded-lg shadow-md border border-orange-300">
          <h2 className="text-orange-800 font-semibold text-lg">
            Mandir Name: <span className="font-bold">{formData.mandirName}</span>
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <label htmlFor="date" className="block text-orange-800 font-medium mb-2">
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
              <label htmlFor="pandit" className="block text-orange-800 font-medium mb-2">
                Pandits:
              </label>
              <select
                id="pandit"
                name="pandit"
                value={formData.pandit}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-orange-300 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-orange-500 transition-all"
              >
                <option value="">Select a Pandit</option>
                {pandits.map((pandit) => (
                  <option key={pandit._id} value={pandit.name}>
                    {pandit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <label htmlFor="service" className="block text-orange-800 font-medium mb-2">
                Services:
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-orange-300 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-orange-500 transition-all"
              >
                <option value="">Select a Service</option>
                {services.map((service) => (
                  <option key={service._id} value={service.name}>
                    {service.name}
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

        {/* Success Dialog */}
        {isBookingSuccess && (
          <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-600">
            <div className="bg-yellow-200 p-6 rounded-lg shadow-lg max-w-sm w-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-orange-700 font-semibold text-lg">Booking Successful!</h2>
                <button
                  onClick={closeDialog}
                  className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600"
                >
                  X
                </button>
              </div>
              <p className="text-orange-700">Your service booking has been successfully created!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
