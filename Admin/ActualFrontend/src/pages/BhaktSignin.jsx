import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import images from '../assets/bsignin.jpg';

export default function SignIn() {
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
      const res = await fetch("/backend/bhakt/auth/signin", {
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
      navigate("/bhakt/home");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="h-screen flex">
      {/* Left Side - Background Image */}
      <div
        className="w-1/2 h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${images})` }}
      />

      {/* Right Side - Sign In Form */}
      <div
        className="w-1/2 h-full flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(240, 240, 255, 0.7))",
        }}
      >
        {/* Sign-In Box */}
        <div
          className="rounded-lg shadow-lg p-8 max-w-md w-full"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.9)", // Light shade
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Slight shadow for elevation
          }}
        >
          <h1 className="font-semibold my-5 text-center text-3xl">Sign In</h1>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <input
              placeholder="E-Mail"
              id="email"
              type="email"
              className="border p-4 rounded-xl"
              onChange={handleChange}
            />
            <input
              placeholder="Password"
              id="password"
              type="password"
              className="border p-4 rounded-xl"
              onChange={handleChange}
            />
            {error && <p className="text-red-700 text-center">{error}</p>}
            <button
              disabled={loading}
              className="border rounded-xl bg-gray-500 disabled:opacity-50 text-white p-4 hover:opacity-90"
            >
              {loading ? "Loading..." : "SIGN IN"}
            </button>
          </form>
          <div className="flex gap-3 justify-center py-3">
            <p>Don't have an Account?</p>
            <Link to={"/bhakt/sign-up"}>
              <span className="text-blue-700">Sign Up</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
