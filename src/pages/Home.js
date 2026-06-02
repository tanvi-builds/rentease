import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-primary text-white py-20 px-6 text-center">
        <h1 className="text-5xl font-heading font-bold mb-4">
          Rent Furniture & Appliances
        </h1>
        <p className="text-xl font-body mb-8 text-gray-200">
          Affordable monthly rentals for students & professionals
        </p>
        <Link to="/products" className="bg-accent text-white px-8 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition">
          Browse Products
        </Link>
      </div>

      {/* Why RentEase Section */}
      <div className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-heading font-bold text-primary text-center mb-12">
          Why RentEase?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-heading font-bold text-primary mb-2">Affordable</h3>
            <p className="text-gray-500 font-body">No high upfront costs — pay monthly!</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="text-4xl mb-4">🚚</div>
            <h3 className="text-xl font-heading font-bold text-primary mb-2">Free Delivery</h3>
            <p className="text-gray-500 font-body">We deliver & pickup at your doorstep!</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="text-4xl mb-4">🔧</div>
            <h3 className="text-xl font-heading font-bold text-primary mb-2">Maintenance</h3>
            <p className="text-gray-500 font-body">Free maintenance support included!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;