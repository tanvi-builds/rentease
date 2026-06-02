import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Login Successful! Welcome to RentEase!');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md">
        
        {/* Logo */}
        <h2 className="text-3xl font-heading font-bold text-primary text-center mb-2">
          Welcome Back! 👋
        </h2>
        <p className="text-gray-500 font-body text-center mb-8">
          Login to your RentEase account
        </p>

        {/* Form */}
        <div className="flex flex-col gap-5">
          <div>
            <label className="block text-dark font-semibold mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 font-body focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-dark font-semibold mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 font-body focus:outline-none focus:border-primary"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="bg-primary text-white py-3 rounded-lg font-heading font-bold text-lg hover:opacity-90 transition"
          >
            Login
          </button>
        </div>

        <p className="text-center text-gray-500 font-body mt-6">
          Don't have an account?{' '}
          <Link to="/signup" className="text-accent font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;