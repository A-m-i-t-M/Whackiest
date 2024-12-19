import React from 'react'
import { Link } from 'react-router-dom';


//I need to make a form which displays
//Purohit name
// Purohit Price
// Add Purohit
// 
// Item 1...Item 5 along with their prices
// Add Item
// 
// Service 1...Service 5 along with prices
// Add Service
export default function Home() {

  // const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  return (
    <div className=' mx-auto p-4 max-w-lg'>
      <h1 className=' text-center font-bold uppercase'> Current Temple </h1>
      <div className=' w-85 border border-gray-900 rounded-xl bg-slate-500'>
        <h3 className=' text-center uppercase font-semibold'>Add Purohits</h3>
        <form className=' my-5'>
          <div className='flex flex-col justify-center gap-5'>
            <input type='text' name='name' id='name' placeholder='Purohit Name' className='border rounded-xl text-gray-600 bg'></input>
            <input type='text' name='price' id='price' placeholder='Hourly Charge' className='border rounded-xl text-gray-600'></input>
            <button disabled={null} className='border rounded-xl bg-slate-700 w-40 self-center text-white'>Add Purohit</button>
          </div>
        </form>
      </div>
      <div className=' w-85 border border-gray-900 rounded-xl bg-slate-500'>
        <h3 className=' text-center uppercase font-semibold'>Add Items</h3>
        <form className=' my-5'>
          <div className='flex flex-col justify-center gap-5'>
            <input type='text' name='name' id='name' placeholder='Item Name' className='border rounded-xl text-gray-600 bg'></input>
            <input type='text' name='price' id='price' placeholder='Item Price' className='border rounded-xl text-gray-600'></input>
            <button disabled={null} className='border rounded-xl bg-slate-700 w-40 self-center text-white'>Add Item</button>
          </div>
        </form>
      </div>
      <div className=' w-85 border border-gray-900 rounded-xl bg-slate-500'>
        <h3 className=' text-center uppercase font-semibold'>Add Services</h3>
        <form className=' my-5'>
          <div className='flex flex-col justify-center gap-5'>
            <input type='text' name='name' id='name' placeholder='Service Name' className='border rounded-xl text-gray-600 bg'></input>
            <input type='text' name='price' id='price' placeholder='Service Price' className='border rounded-xl text-gray-600'></input>
            <button disabled={null} className='border rounded-xl bg-slate-700 w-40 self-center text-white'>Add Service</button>
          </div>
        </form>
      </div>
      <Link></Link>
    </div>
    );
}

