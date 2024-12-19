import React, { useState } from 'react'
import {Link, Navigate, useNavigate} from "react-router-dom";

export default function SignIn() {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e)=>{
        setFormData({
          ...formData,
          [e.target.id] : e.target.value,
        })
    }

    const handleSubmit = async (e)=>{
        try {
          e.preventDefault();
          setLoading(true);
        //   dispatch(signInStart());
          const res = await fetch("/backend/auth/signin", {
            method : "POST",
            headers : {
              'Content-Type' : 'application/json',
            },
            body : JSON.stringify(formData)
          });
          const data = await res.json();
    
          if(data.success === false){
            setLoading(false);
            setError(data.message);
            // dispatch(signInFailure(data.message));
            return;
          }
    
          setLoading(false);
          setError(null);
          // localStorage.setItem('currentUser', JSON.stringify(formData));
        //   dispatch(signInSuccess(data));
          navigate("/");
          // console.log(data);
        } catch (error) {
          setLoading(false);
          setError(error.message);
        //   dispatch(signInFailure(data.message));
        }
        
    }
    return <div className=' mx-auto p-4 max-w-lg'>
    <h1 className=' font-semibold my-5 text-center text-3xl'>Sign In</h1>
    <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
      {/* <input 
        placeholder='Username' 
        id='username' type='text' 
        className='border p-3 rounded-xl' 
        onChange={handleChange}/> */}
      <input 
        placeholder='E-Mail' 
        id='email' 
        type='email' 
        className='border p-4 rounded-xl ' 
        onChange={handleChange}/>

      <input 
        placeholder='Password' 
        id='password' 
        type='password' 
        className='border p-4 rounded-xl' 
        onChange={handleChange}/>
      
      {error && <p className='text-red-700 text-center'>{error}</p>} 
      
      <button 
        disabled = {loading}
        className=' border rounded-xl bg-gray-500 disabled:opacity-10 text-white p-4 hover: opacity-90'>
          {loading ? "Loading..." : "SIGN IN"}
      </button>
    
    </form>
    
    <div className=' flex gap-3 justify-center py-3'>
      <p>Dont have an Account?</p>
      <Link to={"/sign-up"}>
        <span className=' text-blue-700'>Sign Up</span>
      </Link>
    </div>
  
  </div>
}