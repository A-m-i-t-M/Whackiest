// import React from 'react'
// import { useLocation } from 'react-router-dom'

// export default function DarshanBooking() {
  
//   const location = useLocation();
//   const mandir = location.state?.mandir;

//   console.log(mandir);
    

//   return (
//     <div>DarshanBooking</div>
//   )
// }


import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function DarshanBooking() {
  const location = useLocation();
  const mandir = location.state?.mandir;

  const [items, setItems] = useState([]); // State to store fetched items
  const [formData, setFormData] = useState({
    mandir: mandir?._id || '', // Initialize with mandir._id
    date: '',
    time: '',
    type: '',
    item: '',
  });

  useEffect(() => {
    
    const fetchItems = async () => {
        if (mandir?._id) {
          try {
            const response = await fetch('/backend/itemm', {
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
    
            if (Array.isArray(data.items)) {
              setItems(data.items);
            } else {
              console.error('Invalid data format received:', data);
            }
          } catch (error) {
            console.error('Error fetching items:', error);
          }
        }
      };


    fetchItems();
  }, [mandir]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async(e) => {
    //   console.log('Form Submitted:', formData);
      // Add your form submission logic here
    try{
        e.preventDefault();
        const res = await fetch("/backend/bhakt/darshan/create",{
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                mandir: formData.mandir,
                date: formData.date,
                time: formData.time,
                type: formData.type,
                item: formData.item,
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
    <div>
      <h1>Darshan Booking</h1>
      <form onSubmit={handleSubmit}>

        {/* Hidden input for mandirId */}
        <input type="hidden" name="mandirId" value={formData.mandir} />

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
          <label htmlFor="time">Timeslot:</label>
          <select
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          >
            <option value="">Select a timeslot</option>
            <option value="slot1">Slot 1</option>
            <option value="slot2">Slot 2</option>
            <option value="slot3">Slot 3</option>
            <option value="slot4">Slot 4</option>
          </select>
        </div>

        <div>
          <label htmlFor="type">Type:</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            <option value="Personal">Personal</option>
            <option value="Group">Group</option>
            <option value="Senior Citizen">Senior Citizen</option>
            <option value="Women Only">Women Only</option>
          </select>
        </div>

        <div>
          <label htmlFor="item">Items:</label>
          <select
            id="item"
            name="item"
            value={formData.item}
            onChange={handleChange}
            required
          >
            <option value="">Select an Item</option>
            {items.map((item) => (
              <option key={item._id} value={item._id}>{item.name}</option>
            ))}
          </select>
        </div>

        

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}