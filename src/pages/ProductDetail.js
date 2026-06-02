import React from 'react';
import { useParams, Link } from 'react-router-dom';

const products = [
  { id: 1, name: "3-Seater Sofa", category: "Furniture", price: 599, deposit: 1000, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400", available: true, description: "Premium quality 3-seater sofa perfect for your living room. Comfortable and stylish." },
  { id: 2, name: "King Size Bed", category: "Furniture", price: 799, deposit: 1500, image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400", available: true, description: "Spacious king size bed with premium mattress for a good night's sleep." },
  { id: 3, name: "Dining Table", category: "Furniture", price: 499, deposit: 800, image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400", available: false, description: "6-seater dining table perfect for family meals and gatherings." },
  { id: 4, name: "Wardrobe", category: "Furniture", price: 699, deposit: 1200, image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400", available: true, description: "Spacious wardrobe with multiple compartments for all your storage needs." },
  { id: 5, name: "Study Table", category: "Furniture", price: 399, deposit: 600, image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400", available: true, description: "Ergonomic study table perfect for students and work from home professionals." },
  { id: 6, name: "Bookshelf", category: "Furniture", price: 299, deposit: 500, image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=400", available: true, description: "5-tier bookshelf to organize your books and decorative items." },
  { id: 7, name: "Refrigerator", category: "Appliances", price: 699, deposit: 1200, image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400", available: true, description: "Double door refrigerator with 300L capacity. Energy efficient and reliable." },
  { id: 8, name: "Washing Machine", category: "Appliances", price: 599, deposit: 1000, image: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400", available: true, description: "Fully automatic washing machine with multiple wash programs." },
  { id: 9, name: "Smart TV 43 inch", category: "Appliances", price: 799, deposit: 1500, image: "https://images.unsplash.com/photo-1461151304267-38535e780c79?w=400", available: false, description: "43 inch Smart TV with 4K display and built-in streaming apps." },
{ id: 10, name: "Air Conditioner", category: "Appliances", price: 899, deposit: 1800, image: "https://media.istockphoto.com/id/583736662/photo/air-conditioner-with-cold-blue-airflow.jpg?s=612x612&w=0&k=20&c=VGDcRF97Q1Z1HUovmXetyiyZ16JRuLi9Mtn-VhNe6u0=", available: true, description: "1.5 ton split AC with 5 star energy rating. Fast cooling technology." },
  { id: 11, name: "Microwave", category: "Appliances", price: 349, deposit: 600, image: "https://img.freepik.com/free-vector/microwave-oven-with-light-inside-isolated-white-background-kitchen-appliances_134830-658.jpg", available: true, description: "25L microwave oven with multiple cooking modes and auto defrost." },
  { id: 12, name: "Water Purifier", category: "Appliances", price: 299, deposit: 500, image: "https://img.freepik.com/premium-photo/water-purifier-with-white-background-high-quality-u_889056-17871.jpg", available: true, description: "RO+UV water purifier with 7 stage purification for safe drinking water." },
];

function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-heading text-primary">Product not found!</h2>
        <Link to="/products" className="text-accent font-semibold mt-4 inline-block">Back to Products</Link>
      </div>
    );
  }

  return (
    <div className="py-12 px-6 max-w-5xl mx-auto">
      <Link to="/products" className="text-accent font-semibold mb-6 inline-block hover:underline">
        ← Back to Products
      </Link>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden md:flex">
        {/* Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 h-80 object-cover"
        />

        {/* Details */}
        <div className="p-8 md:w-1/2">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${product.available ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"}`}>
            {product.available ? "Available" : "Unavailable"}
          </span>

          <h1 className="text-3xl font-heading font-bold text-primary mt-3 mb-2">
            {product.name}
          </h1>

          <p className="text-gray-500 font-body mb-4">{product.category}</p>
          <p className="text-dark font-body mb-6">{product.description}</p>

          <div className="bg-background rounded-xl p-4 mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-gray-500 font-body">Monthly Rent</span>
              <span className="text-accent font-bold text-xl">₹{product.price}/month</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 font-body">Security Deposit</span>
              <span className="text-primary font-bold">₹{product.deposit}</span>
            </div>
          </div>

          {product.available ? (
            <Link to={`/booking/${product.id}`} className="block bg-accent text-white text-center py-3 rounded-lg font-heading font-bold text-lg hover:opacity-90 transition">
              Book Now 🚀
            </Link>
          ) : (
            <button disabled className="block w-full bg-gray-300 text-gray-500 text-center py-3 rounded-lg font-heading font-bold text-lg cursor-not-allowed">
              Currently Unavailable
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;