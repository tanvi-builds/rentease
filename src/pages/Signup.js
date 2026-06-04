import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!name || !email || !phone || !password) {
      setError('Please fill all fields!');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('https://rentease-0pao.onrender.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password })
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Something went wrong!');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-heading font-bold text-primary text-center mb-2">
          Create Account 🎉
        </h2>
        <p className="text-gray-500 font-body text-center mb-8">
          Join RentEase today!
        </p>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="flex flex-col gap-5">
          <div>
            <label className="block text-dark font-semibold mb-2">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 font-body focus:outline-none focus:border-primary"
            />
          </div>

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
            <label className="block text-dark font-semibold mb-2">Phone Number</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 font-body focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-dark font-semibold mb-2">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 font-body focus:outline-none focus:border-primary"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-accent text-white py-3 rounded-lg font-heading font-bold text-lg hover:opacity-90 transition"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </div>

        <p className="text-center text-gray-500 font-body mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-accent font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;