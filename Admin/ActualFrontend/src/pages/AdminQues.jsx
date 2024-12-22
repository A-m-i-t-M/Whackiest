import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function AdminQues() {
  
    const [questions, setQuestions] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        const fetchAdminQues = async()=>{
            try{
                const res = await fetch("/backend/qas/admin",{
                    method: "POST",
                    headers:{
                        "Content-Type" : "application/json",
                    }
                })
                if(!res.ok){
                    console.log("API mistake by me");
                }
                const data = await res.json();
                if (Array.isArray(data.qas)) {
                    setQuestions(data.qas);
                  } else {
                    console.error('Invalid data format received:', data);
                  }
            }catch(error){
                console.log(error);
            }
        }
        fetchAdminQues();
    },[]);

    console.log(questions)

    const handleAnswerQues = (question)=>{
        navigate('/adminanswers', { state: { question } });
    }
    return (
    // <div>AdminQues</div>
    <div className='bg-neutral-300 dark:bg-slate-800 min-h-screen py-10 px-5'>
            <div className="relative flex items-center mb-8">
                <h1 className="w-full text-center font-extrabold text-4xl text-gray-800 dark:text-purple-300 tracking-wide">
                    Questions
                </h1>
            </div>

            {questions.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {questions.map((question, index) => (
                        <div
                            key={index}
                            className="bg-[#FFFAE3] border border-gray-200 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 p-6 bg-gradient-to-br from-yellow-300 to-orange-300 dark:bg-gradient-to-br dark:from-slate-700 dark:to-slate-500"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-2xl font-semibold text-gray-800 dark:text-orange-300">{question.mandirName}</h3>
                            </div>
                            <p className="text-gray-600 text-base dark:text-neutral-200">
                                <strong>Question:</strong> {question.question}
                            </p>
                            
                            <button className='border rounded-xl text-black bg-red-700 p-2 ml-20 mt-2' onClick={()=>handleAnswerQues(question)} >Answer</button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-red-700 text-center">No answers available</p>
            )}
        </div>
  )
}
