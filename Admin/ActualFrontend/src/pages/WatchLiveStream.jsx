import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'


//useLocation ke sath mandir ko lana h
//uss mandir ka jo bhi link h, usse play karna h using iframe

export default function WatchLiveStream() {

  const location = useLocation();
  const mandir = location.state?.mandir;
  const navigate = useNavigate();

  const [urls, setUrls] = useState('');
  
  useEffect(()=>{

    const getVideo = async()=>{
      try{
        // console.log(mandir?._id);
        
        const res = await fetch("backend/livestream/",{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({mandirId: mandir._id})
        });
        // console.log(res);
        
        if(!res.ok){
          console.log("Some error happened during the api call");
        }
        
        const data = await res.json();
        console.log(data);
        console.log(data.live[0].link);
        
        setUrls(data.live[0].link);
        // console.log(data.link);
        
      }catch(error){
        console.log("Couldnt get the video link boss");
      }
    };

    getVideo();
  },[mandir]);


  return (
    // <div>
    //     This is basically where the livestream will be playing.. GGs WP NT NHK NHK NHK NHK NHK NHK NHK
    //     {urls}
    // </div>
    <div>
      <h1>Watch Live Stream</h1>
      {urls ? (
        <iframe
          width="560"
          height="315"
          src={urls}
          title="Live Stream"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <p>Loading live stream...</p>
      )}
    </div>
    
  )
}
