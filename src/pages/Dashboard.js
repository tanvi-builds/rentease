import React from 'react';
import { Link } from 'react-router-dom';

const bookings = [
  { id: 1, product: "King Size Bed", image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400", tenure: 3, monthly: 799, total: 3897, status: "Active", delivery: "2026-06-01" },
  { id: 2, product: "Refrigerator", image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400", tenure: 6, monthly: 699, total: 5394, status: "Active", delivery: "2026-05-15" },
  { id: 3, product: "3-Seater Sofa", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400", tenure: 1, monthly: 599, total: 1599, status: "Completed", delivery: "2026-04-01" },
];

function Dashboard() {
  return (
    <div className="py-12 px-6 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-primary">My Dashboard 📊</h1>
          <p className="text-gray-500 font-body mt-1">Welcome back, Tanvi! 👋</p>
        </div>
        <Link to="/products" className="bg-accent text-white px-6 py-3 rounded-lg font-heading font-bold hover:opacity-90 transition">
          + New Rental
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <div className="text-4xl mb-2">📦</div>
          <h3 className="text-3xl font-heading font-bold text-primary">2</h3>
          <p className="text-gray-500 font-body">Active Rentals</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <div className="text-4xl mb-2">✅</div>
          <h3 className="text-3xl font-heading font-bold text-primary">1</h3>
          <p className="text-gray-500 font-body">Completed Rentals</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <div className="text-4xl mb-2">💰</div>
          <h3 className="text-3xl font-heading font-bold text-primary">₹1498</h3>
          <p className="text-gray-500 font-body">Monthly Spending</p>
        </div>
      </div>

      {/* Bookings List */}
      <h2 className="text-2xl font-heading font-bold text-primary mb-6">My Rentals</h2>
      <div className="flex flex-col gap-6">
        {bookings.map(booking => (
          <div key={booking.id} className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row gap-6 items-center">
            <img src={booking.image} alt={booking.product} className="w-full md:w-32 h-24 object-cover rounded-xl" />
            <div className="flex-1">
              <h3 className="text-xl font-heading font-bold text-primary mb-1">{booking.product}</h3>
              <p className="text-gray-500 font-body">Tenure: {booking.tenure} months | ₹{booking.monthly}/month</p>
              <p className="text-gray-500 font-body">Delivery: {booking.delivery}</p>
            </div>
            <div className="text-right">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${booking.status === "Active" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"}`}>
                {booking.status}
              </span>
              <p className="text-accent font-bold text-lg mt-2">₹{booking.total}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;