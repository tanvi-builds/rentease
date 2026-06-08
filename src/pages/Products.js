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
  const [search, setSearch] = useState("");
  const { addToCart } = useCart();

  const filtered = products
    .filter(p => filter === "All" || p.category === filter)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ background: '#0A0F1E', minHeight: '100vh', paddingBottom: '80px' }}>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #0A0F1E 100%)',
        padding: '50px 24px 40px', textAlign: 'center',
        borderBottom: '1px solid rgba(59,130,246,0.1)'
      }}>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 900, color: '#fff', marginBottom: '8px', letterSpacing: '-1px' }}>
          Our Products
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '15px' }}>
          Choose from our wide range of furniture & appliances
        </p>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>

        {/* Search Bar */}
        <div style={{ padding: '32px 0 0' }}>
          <div style={{ position: 'relative', maxWidth: '500px', margin: '0 auto' }}>
            <span style={{
              position: 'absolute', left: '16px', top: '50%',
              transform: 'translateY(-50%)', fontSize: '16px'
            }}>🔍</span>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%', padding: '12px 16px 12px 44px',
                background: '#0F172A',
                border: '1.5px solid rgba(59,130,246,0.2)',
                borderRadius: '12px', color: '#fff',
                fontSize: '14px', outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s'
              }}
              onFocus={e => e.target.style.borderColor = 'rgba(59,130,246,0.6)'}
              onBlur={e => e.target.style.borderColor = 'rgba(59,130,246,0.2)'}
            />
            {search && (
              <button onClick={() => setSearch("")} style={{
                position: 'absolute', right: '12px', top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.1)', border: 'none',
                color: '#fff', borderRadius: '50%',
                width: '22px', height: '22px', cursor: 'pointer',
                fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>✕</button>
            )}
          </div>
        </div>

        {/* Filter */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', padding: '20px 0 28px', flexWrap: 'wrap' }}>
          {["All", "Furniture", "Appliances"].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                padding: '10px 28px', borderRadius: '50px',
                fontWeight: 600, fontSize: '14px', cursor: 'pointer',
                border: '1.5px solid', transition: 'all 0.2s',
                borderColor: filter === cat ? '#3B82F6' : 'rgba(59,130,246,0.2)',
                background: filter === cat ? '#3B82F6' : 'rgba(59,130,246,0.05)',
                color: filter === cat ? '#fff' : '#94A3B8',
                boxShadow: filter === cat ? '0 4px 16px rgba(59,130,246,0.3)' : 'none'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* No Results */}
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px', fontWeight: 600 }}>
              "{search}" sathi kahi products nahi
            </p>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px', marginTop: '8px' }}>
              Doosra search try kar
            </p>
          </div>
        )}

        {/* Products Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
          {filtered.map(product => (
            <div key={product.id} style={{
              background: '#0F172A', borderRadius: '20px',
              overflow: 'hidden',
              border: '1px solid rgba(59,130,246,0.12)',
              transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s'
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(59,130,246,0.15)';
                e.currentTarget.style.borderColor = 'rgba(59,130,246,0.35)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'rgba(59,130,246,0.12)';
              }}
            >
              <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <span style={{
                  position: 'absolute', top: '12px', right: '12px',
                  padding: '4px 12px', borderRadius: '20px',
                  fontSize: '12px', fontWeight: 600,
                  background: product.available ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)',
                  color: product.available ? '#4ADE80' : '#F87171',
                  border: `1px solid ${product.available ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`
                }}>
                  {product.available ? 'Available' : 'Unavailable'}
                </span>
              </div>

              <div style={{ padding: '20px' }}>
                <span style={{
                  fontSize: '12px', color: '#93C5FD', fontWeight: 600,
                  background: 'rgba(59,130,246,0.1)',
                  border: '1px solid rgba(59,130,246,0.2)',
                  padding: '3px 10px', borderRadius: '20px'
                }}>
                  {product.category}
                </span>
                <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '18px', margin: '10px 0 4px' }}>
                  {product.name}
                </h3>
                <p style={{ color: '#3B82F6', fontWeight: 800, fontSize: '20px', margin: '8px 0 4px' }}>
                  ₹{product.price}<span style={{ fontSize: '14px', fontWeight: 500, color: '#475569' }}>/month</span>
                </p>
                <p style={{ color: '#475569', fontSize: '12px', marginBottom: '16px' }}>
                  + ₹{product.deposit} refundable deposit
                </p>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => addToCart(product)}
                    disabled={!product.available}
                    style={{
                      flex: 1, padding: '10px',
                      background: product.available ? '#3B82F6' : 'rgba(59,130,246,0.08)',
                      color: product.available ? '#fff' : '#475569',
                      border: 'none', borderRadius: '10px',
                      fontWeight: 600, fontSize: '14px',
                      cursor: product.available ? 'pointer' : 'not-allowed',
                      boxShadow: product.available ? '0 4px 12px rgba(59,130,246,0.3)' : 'none'
                    }}
                  >
                    Add to Cart 🛒
                  </button>
                  <Link to={`/products/${product.id}`} style={{
                    flex: 1, padding: '10px',
                    background: 'rgba(59,130,246,0.08)',
                    color: '#93C5FD',
                    border: '1px solid rgba(59,130,246,0.2)',
                    borderRadius: '10px',
                    fontWeight: 600, fontSize: '14px',
                    textDecoration: 'none', textAlign: 'center',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;