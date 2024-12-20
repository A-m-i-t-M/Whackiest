import React from 'react'
import { useNavigate } from 'react-router-dom'
function LangingPage() {
  const navigate=useNavigate()
  return (
    <div className="flex justify-center gap-4 mt-10">
    <button
        onClick={() => navigate("/sign-in")}
        className="px-6 py-3 text-lg font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105"
    >
        Admin
    </button>
    <button
        onClick={() => navigate("/bhakt/sign-in")}
        className="px-6 py-3 text-lg font-semibold text-white bg-green-500 rounded-lg shadow-md hover:bg-green-600 transition-transform transform hover:scale-105"
    >
        Bhakt
    </button>
</div>
  )
}

export default LangingPage
