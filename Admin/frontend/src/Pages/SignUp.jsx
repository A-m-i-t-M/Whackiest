import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.id] : e.target.value,
        });
    };

    const handleSubmit = async(e)=>{
        try{
            e.preventDefault();
            setLoading(true);
            const res = await fetch("/api/auth/signup", {
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
                return;
            }

            setLoading(false);
            setError(null);
            navigate("/sign-in");
            
        }catch(error){
            setLoading(false);
            setError(error.message);
        }
    };
    
    return (
        <div className=' mx-auto p-4 max-w-lg'>
            <h1 className='font-semibold my-5 text-center text-3xl'>Sign Up</h1>
            <form className='flex flex-col gap-4'>
                <input placeholder='Username' id='username' type='text' className='border p-3 rounded-xl' onChange={handleChange}/>
                <input placeholder='Email ID' id='email' type='email' className='border p-3 rounded-xl' onChange={handleChange}/>
                <input placeholder='Password' id='password' type='password' className='border p-3 rounded-xl' onChange={handleChange}/>
                <button disabled = {loading} className='border rounded-xl bg-gray-700 disabled:opacity-20 text-white p-4 hover:opacity-90'>{loading ? "Loading..." : "SIGN UP"}</button>
            </form>

            <div className='flex justify-center py-3 gap-1'>
                <p>Have an Account? </p>
                <Link to = {"/sign-in"}>
                    <span className='text-blue-700'>Sign In</span>
                </Link>
            </div>
        </div>
    )
}
