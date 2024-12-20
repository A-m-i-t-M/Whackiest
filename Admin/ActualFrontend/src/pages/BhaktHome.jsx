import React from 'react'
import { Link, useNavigate } from 'react-router-dom'


export default function Home() {

  const navigate = useNavigate();

  const handleSignOut = async()=>{
    try{
      const res = await fetch('/backend/auth/signout');
      const data = await res.json();

      if (data.success === false) {
        console.log(data.error);
      }

      console.log('Signed out');
      navigate('/');
    }catch(error){
      // next(error);
      console.log("Couldnt sign out bro");
      
    }
  }



  return <div className='mx-auto max-w-lg'>
    <div className=' my-10'>
      <h1 className='text-center font-semibold'>Welcome to Pooja Pehal</h1>
      <div className='flex gap-4 flex-row justify-center'>
        <div className='flex flex-col w-1/3 border rounded-xl border-slate-700 p-4 my-0'>
          {/* Div 1 */}
          <div className='text-center my-3 font-semibold underline'>
            <Link to={"/darshan"}>
              <span className='text-center my-3 font-semibold underline'>Regular Darshan</span>
            </Link>
          </div>
          <div className='text-justify'>This is the description part. I am not going to write much over here because CSS m mere laude lag rhe h bhai... pls help 😭</div>
        </div>
        <div className='flex flex-col w-1/3 border rounded-xl border-slate-700 p-4 my-0'>
          {/* Div 2 */}
          <div className='text-center my-3 font-semibold underline'>
            <Link to={"/events"}>
              <span className='text-center my-3 font-semibold underline'>Special Event</span>
            </Link>
          </div>
          <div className='text-justify'>This is the description part. I am not going to write much over here because CSS m mere laude lag rhe h bhai... pls help 😭</div>
        </div>
        <div className='flex flex-col w-1/3 border rounded-xl border-slate-700 p-4 my-0'>
          {/* Div 3 */}
          <div className='text-center my-3 font-semibold underline'>
            <Link to={"/donation"}>
              <span className='text-center my-3 font-semibold underline'>Donations</span>
            </Link>
          </div>
          <div className='text-justify'>This is the description part. I am not going to write much over here because CSS m mere laude lag rhe h bhai... pls help 😭</div>
        </div>
      </div>
    </div>
    <button className=' text-white border rounded-xl border-red-700 bg-red-700' onClick={handleSignOut}>Sign Out</button>
  </div>
}