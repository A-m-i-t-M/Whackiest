import React, { useEffect, useState } from 'react'

export default function Answers() {

    const [items, setItems] = useState([]);
    useEffect(() => {
        const fetchItems = async () => {
          
            try {
              const response = await fetch('/backend/qas/bhakt', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                // body: JSON.stringify({ userId: mandir._id }),
              });
    
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
    
              const data = await response.json();
    
              if (Array.isArray(data.qas)) {
                setItems(data.qas);
              } else {
                console.error('Invalid data format received:', data);
              }
            } catch (error) {
              console.error('Error fetching items:', error);
            }
          
        };
    
        fetchItems();
      }, []);

      console.log(items);

      const handleDeleteMe = async(qaId)=>{
        // e.preventDefault();
        console.log(qaId);
        
        try{
            const res = await fetch("",{
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({qaId})
            })

            if(!res.ok){
                console.log(("Some error happened over here"));
            }

            setItems((itemwa)=> itemwa.filter((itemm)=>itemm._id !== qaId));

        }catch(error){
            console.log("Couldnt delete thsi ");
            
        }
      }
      
  return (
    // <div>Answers</div>
    // <div>
    //         <h1>Answers</h1>
    //         {items.length > 0 ? (
    //             <ul>
    //                 {items.map((item, index) => (
    //                     <li key={index}>
    //                         <h2>{item.mandirName}</h2>
    //                         <p><strong>Question:</strong> {item.question}</p>
    //                         <p><strong>Answer:</strong> {item.answer}</p>
    //                     </li>
    //                 ))}
    //             </ul>
    //         ) : (
    //             <p>No answers available</p>
    //         )}
    //     </div>
    <div className='bg-neutral-300 dark:bg-slate-800 min-h-screen py-10 px-5'>
            <div className="relative flex items-center mb-8">
                <h1 className="w-full text-center font-extrabold text-4xl text-gray-800 dark:text-purple-300 tracking-wide">
                    Answers
                </h1>
            </div>

            {items.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="bg-[#FFFAE3] border border-gray-200 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 p-6 bg-gradient-to-br from-yellow-300 to-orange-300 dark:bg-gradient-to-br dark:from-slate-700 dark:to-slate-500"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-2xl font-semibold text-gray-800 dark:text-orange-300">{item.mandirName}</h3>
                            </div>
                            <p className="text-gray-600 text-base dark:text-neutral-200">
                                <strong>Question:</strong> {item.question}
                            </p>
                            <p className="text-gray-600 text-base dark:text-neutral-200 mt-2">
                                <strong>Answer:</strong> {item.answer}
                            </p>
                            <button className='border rounded-xl text-black bg-red-700 p-2 ml-20 mt-2' onClick={()=>handleDeleteMe(item._id)}>Delete</button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-red-700 text-center">No answers available</p>
            )}
        </div>
  )
}


