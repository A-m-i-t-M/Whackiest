import React, { useEffect, useState } from 'react'

//Need to render the username, date and timeslot

export default function ViewAdminStuff() {
      const [darshanbookings, setDarshanBookings] = useState([]);
      const [servicebookings, setServiceBookings] = useState([]);
      const [error, setError] = useState(null);
    
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

        const fetchServiceBookings = async()=>{
          try{
            const res = await fetch("backend/bookings/admin");
            if(!res.ok){
              throw new Error("Failed to fetch the Services");
            }
            const data = await res.json();
            setServiceBookings(data.bookings);
          }catch(error){
            setError(error.message);
          } 
        }
    
        fetchDarshanBookings();
        fetchServiceBookings();
      }, []);

      // console.log(bookings);
      console.log(servicebookings);
      
      const handleDeleteService = async(bookingId)=>{
        try{
          const res = await fetch("/backend/bookings/admin/cancel", {
            method: "POST",
            headers: {
              "Content-Type" : "application/json",
            },
            body: JSON.stringify({bookingId})
          });
    
          if(!res.ok){
            throw new Error("Delete nahi kar paya bro");
          }
    
          setServiceBookings((prevBookings)=>
            prevBookings.filter((booking)=>booking._id !== bookingId)
          )
    
        }catch(error){
          setError(error.message);
        }
      }
      
    
      return (
        <div className="min-h-screen bg-gray-100 py-10 px-5">
          <h1 className="text-3xl font-bold text-center text-indigo-600 mb-8">All Bookings</h1>
          {error && (
            <div className="text-red-500 text-center mb-4">
              <p>Error: {error}</p>
            </div>
          )}
          <h1 className=' font-bold text-2xl ml-4'>Darshans</h1>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {darshanbookings.map((booking, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  User Name: {booking.userName}
                </h2>
                <p className="text-gray-600">
                  <span className="font-medium">Date:</span> {booking.date}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Time:</span> {booking.time}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Item:</span> {booking.item}
                </p>
              </div>
            ))}
          </div>
          {/* List out these 4 thinsgs username pandit service date */}
          <h1 className=' font-bold text-2xl ml-4'>Services</h1>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {servicebookings.map((booking, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  User Name: {booking.userName}
                </h2>
                <p className="text-gray-600">
                  <span className="font-medium">Service:</span> {booking.service}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Pandit:</span> {booking.pandit}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Date:</span> {booking.date}
                </p>
              <button className=' ml-64 mr-0' onClick={()=>handleDeleteService(booking._id)}>Cancel</button>
              </div>
            ))}
          </div>
        </div>
      );
  }