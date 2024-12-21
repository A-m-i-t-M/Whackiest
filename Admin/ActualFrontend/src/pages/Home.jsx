import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import images from '../assets/bg5.png';

export default function Home() {
  const [purohit, setPurohit] = useState({ name: '', price: '' });
  const [item, setItem] = useState({ name: '', price: '' });
  const [service, setService] = useState({ name: '', price: '' });
  const navigate = useNavigate();

  const handleChangePurohit = (e) => {
    setPurohit({
      ...purohit,
      [e.target.id]: e.target.value,
    });
  };

  const handleChangeItem = (e) => {
    setItem({
      ...item,
      [e.target.id]: e.target.value,
    });
  };

  const handleChangeService = (e) => {
    setService({
      ...service,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmitPurohit = async (e) => {
    try {
      const res = await fetch('/backend/purohit/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(purohit),
      });
      const data = await res.json();

      if (data.success === false) {
        console.log('Error hua bc');
        return;
      }
      console.log('Success');
    } catch (error) {
      console.log('Error hua bc');
    }
  };

  const handleSubmitItem = async (e) => {
    try {
      const res = await fetch('/backend/itemm/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });
      const data = await res.json();

      if (data.success === false) {
        console.log('Error hua bc');
        return;
      }
      console.log('Success');
    } catch (error) {
      console.log('Error hua bc');
    }
  };

  const handleSubmitService = async (e) => {
    try {
      const res = await fetch('/backend/service/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(service),
      });
      const data = await res.json();

      if (data.success === false) {
        console.log('Error hua bc');
        return;
      }
      console.log('Success');
    } catch (error) {
      console.log('Error hua bc');
    }
  };

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

  const handleViewBookings = async()=>{
    try{
      navigate("/view-admin-bookings");
    }catch(error){
      console.log("Cant see the bookings macha");
    }
  }

  return (
    <div
      style={{
        backgroundImage: `url(${images})`, // Fixed interpolation for background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
      }}
    >
      <div className="bg-white bg-opacity-80 mx-auto p-4 max-w-lg rounded-xl shadow-lg">
        <h1 className="text-center font-bold uppercase text-2xl mb-5">Current Temple</h1>
        <div className="w-full border border-gray-900 rounded-xl bg-slate-500 p-4 mb-5">
          <h3 className="text-center uppercase font-semibold">Add Purohits</h3>
          <form className="my-5" onSubmit={handleSubmitPurohit}>
            <div className="flex flex-col justify-center gap-5">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Purohit Name"
                className="border p-3 rounded-xl text-gray-600"
                onChange={handleChangePurohit}
              />
              <input
                type="text"
                name="price"
                id="price"
                placeholder="Hourly Charge"
                className="border p-3 rounded-xl text-gray-600"
                onChange={handleChangePurohit}
              />
              <button className="border rounded-xl bg-slate-700 w-40 self-center text-white py-2">
                Add Purohit
              </button>
            </div>
          </form>
        </div>
        <div className="w-full border border-gray-900 rounded-xl bg-slate-500 p-4 mb-5">
          <h3 className="text-center uppercase font-semibold">Add Items</h3>
          <form className="my-5" onSubmit={handleSubmitItem}>
            <div className="flex flex-col justify-center gap-5">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Item Name"
                className="border p-3 rounded-xl text-gray-600"
                onChange={handleChangeItem}
              />
              <input
                type="text"
                name="price"
                id="price"
                placeholder="Item Price"
                className="border p-3 rounded-xl text-gray-600"
                onChange={handleChangeItem}
              />
              <button className="border rounded-xl bg-slate-700 w-40 self-center text-white py-2">
                Add Item
              </button>
            </div>
          </form>
        </div>
        <div className="w-full border border-gray-900 rounded-xl bg-slate-500 p-4 mb-5">
          <h3 className="text-center uppercase font-semibold">Add Services</h3>
          <form className="my-5" onSubmit={handleSubmitService}>
            <div className="flex flex-col justify-center gap-5">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Service Name"
                className="border p-3 rounded-xl text-gray-600"
                onChange={handleChangeService}
              />
              <input
                type="text"
                name="price"
                id="price"
                placeholder="Service Price"
                className="border p-3 rounded-xl text-gray-600"
                onChange={handleChangeService}
              />
              <button className="border rounded-xl bg-slate-700 w-40 self-center text-white py-2">
                Add Service
              </button>
            </div>
          </form>
        </div>
        <div className="flex justify-between align-middle">
          <div className="justify-evenly w-1/3">
            <Link to={'/review'}>
              <span className="text-blue-700 underline">View Details</span>
            </Link>
          </div>
          <div className="justify-evenly w-1/3"> 
            <button
              className="uppercase text-red-700 border rounded-xl px-4 py-2"
              onClick={handleViewBookings}>
              Bookings
            </button>
          </div>
          <div className="justify-evenly w-1/3">
            <button
              className="uppercase text-red-700 border rounded-xl px-4 py-2"
              onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
}