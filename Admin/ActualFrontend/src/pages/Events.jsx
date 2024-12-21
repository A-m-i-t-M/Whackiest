import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';

export default function Events() {
    const [mandirs, setMandirs] = useState([]);
    const [error, setError] = useState(null);
  
    const navigate = useNavigate();
  
    useEffect(()=>{
      const fetchMandirs = async()=>{
          try{
              const res = await fetch("/backend/auth/getalltemples", {
                  method : "GET",
                  headers: {
                      'Content-Type' : "application/json",
                  },
              });
              if (!res.ok){
                  const errorData = await res.json();
                  throw new Error(errorData.message || "Failed to fetch purohits")
              }
              const data = await res.json();
              setMandirs(data.temples)
          }catch(error){
              setError(error.message);
          }
      }
      fetchMandirs(); 
    },[])
  
    console.log(error);
    console.log(mandirs);
  
    const handleCardClick = (mandir) => {
    //   navigate("/mandirbook", {state : {mandir}});
      navigate("/mandir-service-book", {state : {mandir}});
    };

  return (
    <div>
      {/* <h1>Temples:</h1> */}

      <div className="flex items-center">
          <button className="relative z-10 mt-4 bg-red-500 text-white text-sm font-medium py-2 px-4 rounded hover:bg-red-600 transition"
                  onClick={()=>navigate(-1)}>Go Back</button>
          
          <h1 className="absolute inset-x-0 text-center font-bold text-3xl">
            All Temples
          </h1>

      </div>

      {error && <p className="text-red-700">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mandirs.map((mandir) => (
          <div
            key={mandir._id}
            className="border p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
            onClick={()=> handleCardClick(mandir)}
          >
            {/* <dweuigdcub props={mandir}/> */}
            <h3 className="font-bold text-lg">{mandir.username}</h3>
            <p className="text-gray-700">{mandir.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}