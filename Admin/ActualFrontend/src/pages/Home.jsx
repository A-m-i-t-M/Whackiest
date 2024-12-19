import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';



export default function Home() {
  const [purohit, setPurohit] = useState({ name : '', price : ''});
  const [item, setItem] = useState({ name : '', price : ''});
  const [service, setService] = useState({ name : '', price : ''});
  const navigate = useNavigate();
  const handleChangePurohit = (e)=>{
    setPurohit({
      ...purohit, 
      [e.target.id] : e.target.value
    })
  }
  const handleChangeItem = (e)=>{
    setItem({
      ...item, 
      [e.target.id] : e.target.value
    })
  }
  const handleChangeService = (e)=>{
    setService({
      ...service, 
      [e.target.id] : e.target.value
    })
  }

  const handleSubmitPurohit = async(e)=>{
    try{
      // e.preventDefault();
      const res = await fetch("/backend/purohit/create", {
        method : "POST",
        headers : {
          'Content-Type' : 'application/json',
        },
        body : JSON.stringify(purohit)
      });
      const data = await res.json();

      if(data.success === false){
        // setLoading(false);
        // setError(data.message);
        // dispatch(signInFailure(data.message));
        console.log("Error hua bc");
        return;
      }
      console.log("Success");
    }catch(error){
      console.log("Error hua bc");
    }
  }
  const handleSubmitItem = async(e)=>{
    try{
      // e.preventDefault();
      const res = await fetch("/backend/itemm/create", {
        method : "POST",
        headers : {
          'Content-Type' : 'application/json',
        },
        body : JSON.stringify(item)
      });
      const data = await res.json();

      if(data.success === false){
        // setLoading(false);
        // setError(data.message);
        // dispatch(signInFailure(data.message));
        console.log("Error hua bc");
        return;
      }
      console.log("Success");
    }catch(error){
      console.log("Error hua bc");
    }
  }
  const handleSubmitService = async(e)=>{
    try{
      e.preventDefault();
      const res = await fetch("/backend/service/create", {
        method : "POST",
        headers : {
          'Content-Type' : 'application/json',
        },
        body : JSON.stringify(service)
      });
      const data = await res.json();

      if(data.success === false){
        // setLoading(false);
        // setError(data.message);
        // dispatch(signInFailure(data.message));
        console.log("Error hua bc");
        return;
      }
      console.log("Success");
    }catch(error){
      console.log("Error hua bc");
    }
  }

  const handleSignOut = async()=>{
    try{
      const res = await fetch("/backend/auth/signout");
      const data = await res.json();

      if(data.success === false){
        console.log(data.error);
      }

      console.log("Signed out");
      navigate("/sign-in");
    }catch(error){
      console.log("Couldnt sign out");
    }
  }
  // const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  return (
    <div className=' mx-auto p-4 max-w-lg'>
      <h1 className=' text-center font-bold uppercase'> Current Temple </h1>
      <div className=' w-85 border border-gray-900 rounded-xl bg-slate-500'>
        <h3 className=' text-center uppercase font-semibold'>Add Purohits</h3>
        <form className=' my-5' onSubmit={handleSubmitPurohit}>
          <div className='flex flex-col justify-center gap-5'>
            <input type='text' name='name' id='name' placeholder='Purohit Name' className='border rounded-xl text-gray-600 bg' onChange={handleChangePurohit}></input>
            <input type='text' name='price' id='price' placeholder='Hourly Charge' className='border rounded-xl text-gray-600' onChange={handleChangePurohit}></input>
            <button className='border rounded-xl bg-slate-700 w-40 self-center text-white'>Add Purohit</button>
          </div>
        </form>
      </div>
      <div className=' w-85 border border-gray-900 rounded-xl bg-slate-500'>
        <h3 className=' text-center uppercase font-semibold'>Add Items</h3>
        <form className=' my-5' onSubmit={handleSubmitItem}>
          <div className='flex flex-col justify-center gap-5'>
            <input type='text' name='name' id='name' placeholder='Item Name' className='border rounded-xl text-gray-600 bg' onChange={handleChangeItem}></input>
            <input type='text' name='price' id='price' placeholder='Item Price' className='border rounded-xl text-gray-600' onChange={handleChangeItem}></input>
            <button disabled={null} className='border rounded-xl bg-slate-700 w-40 self-center text-white'>Add Item</button>
          </div>
        </form>
      </div>
      <div className=' w-85 border border-gray-900 rounded-xl bg-slate-500'>
        <h3 className=' text-center uppercase font-semibold'>Add Services</h3>
        <form className=' my-5' onSubmit={handleSubmitService}>
          <div className='flex flex-col justify-center gap-5'>
            <input type='text' name='name' id='name' placeholder='Service Name' className='border rounded-xl text-gray-600 bg' onChange={handleChangeService}></input>
            <input type='text' name='price' id='price' placeholder='Service Price' className='border rounded-xl text-gray-600' onChange={handleChangeService}></input>
            <button disabled={null} className='border rounded-xl bg-slate-700 w-40 self-center text-white'>Add Service</button>
          </div>
        </form>
      </div>
      <div className='flex justify-between'>
        <div className=' justify-evenly'>
          <Link to={'/review'}>
            <span>View Details</span>
          </Link>
        </div>
        <div>
          <button className=' uppercase text-red-700 border rounded-xl' onClick={handleSignOut}>Sign Out</button>
        </div>
      </div>
    </div>
    );
}

