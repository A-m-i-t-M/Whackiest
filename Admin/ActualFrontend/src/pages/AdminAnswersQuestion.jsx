import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function AdminAnswersQuestion() {

    const location = useLocation();
    const question = location.state?.question;
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
            questionId: question?._id,
            answer: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async(e)=>{
        try {
          e.preventDefault();
          const res = await fetch('/backend/qas/admin/answer', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                questionId: formData.questionId,
                answer: formData.answer,
            }),
          });
    
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
    
          const data = await res.json();
          console.log('Form submitted successfully:', data);
    
        } catch (error) {
          console.log(error);
        }
      };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-96">
        <label htmlFor="answer" className="block text-sm font-medium text-gray-700">
          Answer Question
        </label>
        <input
          type="text"
          id="answer"
          name="answer"
        //   value={question}
        //   onChange={(e) => setQuestion(e.target.value)}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Type your answer here..."
          required
        />
        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

