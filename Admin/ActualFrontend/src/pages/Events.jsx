import React, {useEffect, useState} from 'react'

export default function Events() {
  const [mandirs, setMandirs] = useState([]);
  const [error, setError] = useState(null);

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

  return (<div>
    <h1> Temples:- </h1>
    {error && <p className=' text-red-700'>{error}</p>}
    <ul>
        {mandirs.map((mandir)=>(
            <li key={mandir._id}>
                <h3>{mandir.username}</h3>
                <h3>{mandir.description}</h3>
            </li>
        ))}
    </ul>
  </div>);
}
