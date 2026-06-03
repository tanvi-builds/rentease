import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const products = [
  { id: 1, name: "3-Seater Sofa", category: "Furniture", price: 599, deposit: 1000, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400", available: true },
  { id: 2, name: "King Size Bed", category: "Furniture", price: 799, deposit: 1500, image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400", available: true },
  { id: 3, name: "Dining Table", category: "Furniture", price: 499, deposit: 800, image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400", available: false },
  { id: 4, name: "Wardrobe", category: "Furniture", price: 699, deposit: 1200, image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400", available: true },
  { id: 5, name: "Study Table", category: "Furniture", price: 399, deposit: 600, image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400", available: true },
  { id: 6, name: "Bookshelf", category: "Furniture", price: 299, deposit: 500, image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=400", available: true },
  { id: 7, name: "Refrigerator", category: "Appliances", price: 699, deposit: 1200, image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400", available: true },
  { id: 8, name: "Washing Machine", category: "Appliances", price: 599, deposit: 1000, image: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400", available: true },
  { id: 9, name: "Smart TV 43 inch", category: "Appliances", price: 799, deposit: 1500, image: "https://images.unsplash.com/photo-1461151304267-38535e780c79?w=400", available: false },
  { id: 10, name: "Air Conditioner", category: "Appliances", price: 899, deposit: 1800, image: "https://png.pngtree.com/thumb_back/fh260/background/20250525/pngtree-a-white-air-conditioner-with-digital-display-image_17336786.jpg", available: true },
  { id: 11, name: "Microwave", category: "Appliances", price: 349, deposit: 600, image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400", available: true },
  { id: 12, name: "Water Purifier", category: "Appliances", price: 299, deposit: 500, image: "https://img.freepik.com/premium-photo/water-purifier-with-white-background-high-quality-u_889056-17871.jpg", available: true },
];

function Products() {
  const [filter, setFilter] = useState("All");
  const { addToCart } = useCart();

  const filtered = filter === "All" ? products : products.filter(p => p.category === filter);

  return (
    <div className="py-12 px-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-heading font-bold text-primary text-center mb-8">
        Our Products
      </h1>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-4 mb-10">
        {["All", "Furniture", "Appliances"].map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              filter === cat ? "bg-primary text-white" : "bg-white text-primary border border-primary hover:bg-primary hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filtered.map(product => (
          <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-heading font-bold text-primary mb-1">{product.name}</h3>
              <p className="text-gray-500 font-body mb-4">{product.category}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-accent font-bold text-lg">₹{product.price}/month</span>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${product.available ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"}`}>
                  {product.available ? "Available" : "Unavailable"}
                </span>
              </div>
              <button
                onClick={() => addToCart(product)}
                className="block w-full bg-accent text-white text-center py-2 rounded-lg hover:opacity-90 transition font-semibold mb-2"
              >
                Add to Cart 🛒
              </button>
              <Link to={`/products/${product.id}`} className="block bg-primary text-white text-center py-2 rounded-lg hover:opacity-90 transition font-semibold">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;