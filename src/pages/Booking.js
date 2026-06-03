import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const products = [
  { id: 1, name: "3-Seater Sofa", price: 599, deposit: 1000, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400" },
  { id: 2, name: "King Size Bed", price: 799, deposit: 1500, image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400" },
  { id: 3, name: "Dining Table", price: 499, deposit: 800, image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400" },
  { id: 4, name: "Wardrobe", price: 699, deposit: 1200, image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400" },
  { id: 5, name: "Study Table", price: 399, deposit: 600, image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400" },
  { id: 6, name: "Bookshelf", price: 299, deposit: 500, image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=400" },
  { id: 7, name: "Refrigerator", price: 699, deposit: 1200, image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400" },
  { id: 8, name: "Washing Machine", price: 599, deposit: 1000, image: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400" },
  { id: 9, name: "Smart TV 43 inch", price: 799, deposit: 1500, image: "https://images.unsplash.com/photo-1461151304267-38535e780c79?w=400" },
  { id: 10, name: "Air Conditioner", price: 899, deposit: 1800, image: "https://png.pngtree.com/thumb_back/fh260/background/20250525/pngtree-a-white-air-conditioner-with-digital-display-image_17336786.jpg" },
  { id: 11, name: "Microwave", price: 349, deposit: 600, image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400" },
  { id: 12, name: "Water Purifier", price: 299, deposit: 500, image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=400" },
];

function Booking() {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const [tenure, setTenure] = useState(1);
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [booked, setBooked] = useState(false);

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-heading text-primary">Product not found!</h2>
        <Link to="/products" className="text-accent font-semibold mt-4 inline-block">Back to Products</Link>
      </div>
    );
  }

  const total = product.price * tenure + product.deposit;

  const handleBooking = () => {
    if (!address || !date) {
      alert('Please fill all details!');
      return;
    }
    setBooked(true);
  };

  if (booked) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-10 text-center max-w-md">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-heading font-bold text-primary mb-2">Booking Confirmed!</h2>
          <p className="text-gray-500 font-body mb-6">Your {product.name} will be delivered on {date}!</p>
          <Link to="/dashboard" className="bg-primary text-white px-8 py-3 rounded-lg font-heading font-bold hover:opacity-90 transition">
            View My Bookings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-6 max-w-4xl mx-auto">
      <Link to={`/products/${product.id}`} className="text-accent font-semibold mb-6 inline-block hover:underline">
        ← Back to Product
      </Link>

      <h1 className="text-3xl font-heading font-bold text-primary mb-8">Complete Your Booking</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Product Summary */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-xl mb-4" />
          <h3 className="text-xl font-heading font-bold text-primary mb-4">{product.name}</h3>
          
          {/* Tenure Selection */}
          <p className="font-semibold text-dark mb-2">Select Tenure:</p>
          <div className="flex gap-3 mb-4">
            {[1, 3, 6, 12].map(t => (
              <button
                key={t}
                onClick={() => setTenure(t)}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  tenure === t ? "bg-primary text-white" : "bg-background text-primary border border-primary"
                }`}
              >
                {t}M
              </button>
            ))}
          </div>

          {/* Price Summary */}
          <div className="bg-background rounded-xl p-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">Monthly Rent x {tenure}</span>
              <span className="font-semibold">₹{product.price * tenure}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">Security Deposit</span>
              <span className="font-semibold">₹{product.deposit}</span>
            </div>
            <div className="border-t pt-2 flex justify-between">
              <span className="font-bold text-dark">Total Payable</span>
              <span className="font-bold text-accent text-xl">₹{total}</span>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-xl font-heading font-bold text-primary mb-6">Delivery Details</h3>
          
          <div className="flex flex-col gap-5">
            <div>
              <label className="block text-dark font-semibold mb-2">Delivery Address</label>
              <textarea
                placeholder="Enter your full delivery address"
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

            <button
              onClick={handleBooking}
              className="bg-accent text-white py-3 rounded-lg font-heading font-bold text-lg hover:opacity-90 transition"
            >
              Confirm Booking 🚀
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking;