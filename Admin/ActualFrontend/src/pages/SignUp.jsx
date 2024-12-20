import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import images from '../assets/bg3.png'


export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const res = await fetch("/backend/auth/signup", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }

      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${images})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem',
      }}
    >
      <div className="bg-white bg-opacity-80 mx-auto p-4 max-w-lg rounded-xl">
        <h1 className="font-semibold my-5 text-center text-3xl">Sign Up</h1>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <input
            placeholder="Username"
            id="username"
            type="text"
            className="border p-3 rounded-xl"
            onChange={handleChange}
          />

          {/* <input
            placeholder="Description"
            id="description"
            type="text"
            className="border p-3 rounded-xl"
            onChange={handleChange}
          /> */}
          <textarea placeholder='Description' id='description' className='border p-3 rounded-xl' onChange={handleChange} rows={5}></textarea>

          <input
            placeholder="E-Mail"
            id="email"
            type="email"
            className="border p-3 rounded-xl"
            onChange={handleChange}
          />

          <input
            placeholder="Password"
            id="password"
            type="password"
            className="border p-3 rounded-xl"
            onChange={handleChange}
          />

          {error && <p className="text-red-700">{error}</p>}

          <button
            disabled={loading}
            className="border rounded-xl bg-gray-500 disabled:opacity-10 text-white p-4 hover:opacity-90"
          >
            {loading ? "Loading..." : "SIGN UP"}
          </button>
        </form>
        <div className="flex gap-3 justify-center py-3">
          <p>Have an Account?</p>
          <Link to={"/sign-in"}>
            <span className="text-blue-700">Sign in</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
