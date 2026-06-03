import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-primary text-white px-6 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-heading font-bold text-white">
          Rent<span className="text-accent">Ease</span> 🏠
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center font-body">
          <Link to="/" className="hover:text-accent transition">Home</Link>
          <Link to="/products" className="hover:text-accent transition">Products</Link>
          <Link to="/dashboard" className="hover:text-accent transition">Dashboard</Link>
          {user && user.role === 'admin' && (
            <Link to="/admin" className="hover:text-accent transition">Admin</Link>
          )}
          <Link to="/cart" className="hover:text-accent transition relative">
            🛒 Cart
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>
          {user ? (
            <div className="flex items-center gap-4">
              <span className="font-semibold">Hi, {user.name}! 👋</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded-lg hover:opacity-90 transition font-semibold"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="bg-accent px-4 py-2 rounded-lg hover:opacity-90 transition font-semibold">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col gap-4 mt-4 px-4 font-body">
          <Link to="/" className="hover:text-accent">Home</Link>
          <Link to="/products" className="hover:text-accent">Products</Link>
          <Link to="/dashboard" className="hover:text-accent">Dashboard</Link>
          <Link to="/cart" className="hover:text-accent">🛒 Cart {cart.length > 0 && `(${cart.length})`}</Link>
          {user ? (
            <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded-lg text-center">Logout</button>
          ) : (
            <Link to="/login" className="bg-accent px-4 py-2 rounded-lg text-center">Login</Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;