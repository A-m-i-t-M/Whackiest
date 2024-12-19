import React from 'react'


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
      <div className=' w-85'>
        <h3 className=' text-center uppercase font-semibold'>Add Purohits</h3>
        <form className=' my-5'>
          <div className='flex flex-col justify-center gap-5'>
            <input type='text' name='name' id='name' placeholder='Purohit Name' className='border rounded-xl text-gray-600 bg'></input>
            <input type='text' name='price' id='price' placeholder='Hourly Charge' className='border rounded-xl text-gray-600'></input>
            <button disabled={null} className='border rounded-xl bg-slate-700 w-40 self-center'>Add Purohit</button>
          </div>
        </form>
      </div>
    </div>
    );
}

