import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'


//ServicesForMandirSeenByUser  userId === mandir?._id
//PurohitsForMandirSeenByUser  userId === mandir?._id

export default function MandirServiceBookClient() {
  
  const location = useLocation();
  const mandir = location.state?.mandir;
  const navigate = useNavigate();

  const [pandits, setPandits] = useState([]); // State to store fetched pandits
  const [services, setServices] = useState([]); // State to store fetched services
  const [formData, setFormData] = useState({
    mandir: mandir?._id || '',
    // mandirName: mandir?.username || '', // Initialize with mandir._id
    // date: '',
    // time: '',
    // type: '',
    // item: '',
    mandirName: mandir?.username || '',
    pandit: '',
    service: '',
    date: '',
  });

  useEffect(()=>{
    const fetchPurohits = async()=>{
        if(mandir?._id){
            try {
                const response = await fetch('/backend/purohit', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ userId: mandir._id }),
                });
        
                if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
                }
        
                const data = await response.json();
                console.log(data);
                
                if (Array.isArray(data.purohits)) {
                  setPandits(data.purohits);
                } else {
                  console.error('Invalid data format received:', data);
                }
              } catch (error) {
                console.error('Error fetching items:', error);
              }
            }
    };

    const fetchServices = async()=>{
        if(mandir?._id){
            try {
                const response = await fetch('/backend/service', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ userId: mandir._id }),
                });
        
                if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
                }
        
                const data = await response.json();
        
                if (Array.isArray(data.services)) {
                  setServices(data.services);
                } else {
                  console.error('Invalid data format received:', data);
                }
              } catch (error) {
                console.error('Error fetching items:', error);
              }
        }
    }

    fetchPurohits();
    fetchServices();
  },[mandir]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async(e) => {
    //   console.log('Form Submitted:', formData);
      // Add your form submission logic here
    try{
        e.preventDefault();
        const res = await fetch("/backend/bhakt/booking/create",{
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                mandir: formData.mandir,
                mandirName: formData.mandirName,
                pandit: formData.pandit,
                service: formData.service,
                date: formData.date,
            })
        });
        
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log('Form submitted successfully:', data);
    }catch(error){
        console.log(error);
    }
  };
  
  return (
    <div className=' mx-auto my-10'>
      {/* <h1 className=' font-semibold text-center text-3xl'>Darshan Booking</h1> */}

        <div className="flex items-center">
          <button className="relative z-10 mt-4 bg-red-500 text-white text-sm font-medium py-2 px-4 rounded hover:bg-red-600 transition"
                  onClick={()=>navigate(-1)}>Go Back</button>
          
          <h1 className="absolute inset-x-0 text-center font-bold text-3xl">
            Service Booking
          </h1>

        </div>

      <form onSubmit={handleSubmit} className='flex flex-col'>

        {/* Hidden input for mandirId */}
        <input type="hidden" name="mandirId" value={formData.mandir} />
        <input type="hidden" name="mandirName" value={mandir.username} />

        <div className='flex flex-col mx-auto my-7 gap-3 border rounded-xl'>
          <div>
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="pandit">Pandits:</label>
            <select
              id="pandit"
              name="pandit"
              value={formData.purohit}
              onChange={handleChange}
              required
            >
              <option value="">Select an Item</option>
              {pandits.map((pandit) => (
                <option key={pandit._id} value={pandit.name}>{pandit.name}</option>
              ))}
            </select>    
          </div>

          <div>
            <label htmlFor="service">Services:</label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
            >
              <option value="">Select an Item</option>
              {services.map((service) => (
                <option key={service._id} value={service.name}>{service.name}</option>
              ))}
            </select>    
          </div>
        </div>        

        

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}