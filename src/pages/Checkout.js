import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Checkout() {
  const { cart, totalAmount, clearCart } = useCart();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [ordered, setOrdered] = useState(false);

  if (cart.length === 0 && !ordered) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-8xl mb-6">🛒</div>
          <h2 className="text-3xl font-heading font-bold text-primary mb-4">Cart is Empty!</h2>
          <Link to="/products" className="bg-accent text-white px-8 py-3 rounded-lg font-heading font-bold hover:opacity-90 transition">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const handleOrder = () => {
    if (!name || !phone || !address || !date) {
      alert('Please fill all details!');
      return;
    }
    clearCart();
    setOrdered(true);
  };

  if (ordered) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-10 text-center max-w-md">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-heading font-bold text-primary mb-2">Order Confirmed!</h2>
          <p className="text-gray-500 font-body mb-2">Thank you {name}!</p>
          <p className="text-gray-500 font-body mb-6">Your items will be delivered on {date}!</p>
          <div className="flex gap-4 justify-center">
            <Link to="/dashboard" className="bg-primary text-white px-6 py-3 rounded-lg font-heading font-bold hover:opacity-90 transition">
              View Dashboard
            </Link>
            <Link to="/products" className="bg-accent text-white px-6 py-3 rounded-lg font-heading font-bold hover:opacity-90 transition">
              Shop More
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-heading font-bold text-primary mb-8">Checkout 🚀</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Delivery Form */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-xl font-heading font-bold text-primary mb-6">Delivery Details</h3>
          <div className="flex flex-col gap-5">
            <div>
              <label className="block text-dark font-semibold mb-2">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
              <label className="block text-dark font-semibold mb-2">Delivery Address</label>
              <textarea
                placeholder="Enter your full address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 font-body focus:outline-none focus:border-primary h-28"
              />
            </div>
            <div>
              <label className="block text-dark font-semibold mb-2">Delivery Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 font-body focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl shadow-md p-6 h-fit">
          <h3 className="text-xl font-heading font-bold text-primary mb-6">Order Summary</h3>
          {cart.map(item => (
            <div key={item.id} className="flex justify-between mb-3">
              <div>
                <p className="font-semibold text-dark">{item.name}</p>
                <p className="text-gray-400 text-sm">{item.tenure} month(s)</p>
              </div>
              <p className="font-bold text-accent">₹{item.price * item.tenure + item.deposit}</p>
            </div>
          ))}
          <div className="border-t pt-4 mt-2">
            <div className="flex justify-between mb-6">
              <span className="font-bold text-dark text-lg">Total</span>
              <span className="font-bold text-accent text-xl">₹{totalAmount}</span>
            </div>
            <button
              onClick={handleOrder}
              className="w-full bg-accent text-white py-3 rounded-lg font-heading font-bold text-lg hover:opacity-90 transition"
            >
              Place Order 🎉
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;