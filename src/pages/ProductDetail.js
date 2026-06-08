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
  { id: 10, name: "Air Conditioner", category: "Appliances", price: 899, deposit: 1800, image: "https://png.pngtree.com/thumb_back/fh260/background/20250525/pngtree-a-white-air-conditioner-with-digital-display-image_17336786.jpg", available: true, description: "1.5 ton split AC with 5 star energy rating. Fast cooling technology." },
  { id: 11, name: "Microwave", category: "Appliances", price: 349, deposit: 600, image: "https://img.freepik.com/free-vector/microwave-oven-with-light-inside-isolated-white-background-kitchen-appliances_134830-658.jpg", available: true, description: "25L microwave oven with multiple cooking modes and auto defrost." },
  { id: 12, name: "Water Purifier", category: "Appliances", price: 299, deposit: 500, image: "https://img.freepik.com/premium-photo/water-purifier-with-white-background-high-quality-u_889056-17871.jpg", available: true, description: "RO+UV water purifier with 7 stage purification for safe drinking water." },
];

function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0A0F1E 0%, #0F172A 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>Product not found!</h2>
          <Link to="/products" style={{ color: '#60A5FA', fontWeight: 600, textDecoration: 'none' }}>Back to Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0A0F1E 0%, #0F172A 100%)',
      padding: '40px 20px 100px'
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

        <Link to="/products" style={{
          color: '#60A5FA', fontWeight: 600, textDecoration: 'none',
          fontSize: '14px', display: 'inline-block', marginBottom: '28px'
        }}>
          ← Back to Products
        </Link>

        <div style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '24px', overflow: 'hidden',
          display: 'flex', flexWrap: 'wrap',
          boxShadow: '0 24px 64px rgba(0,0,0,0.3)'
        }}>
          {/* Image */}
          <div style={{ flex: '1 1 400px', position: 'relative' }}>
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: '100%', height: '100%', minHeight: '320px',
                objectFit: 'cover', display: 'block'
              }}
            />
            {/* Overlay gradient */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(90deg, transparent 60%, rgba(10,15,30,0.6) 100%)'
            }} />
          </div>

          {/* Details */}
          <div style={{
            flex: '1 1 340px', padding: '36px 32px',
            position: 'relative', overflow: 'hidden'
          }}>
            {/* Top accent */}
            <div style={{
              position: 'absolute', top: 0, left: '10%', right: '10%', height: '2px',
              background: 'linear-gradient(90deg, transparent, #3B82F6, transparent)'
            }} />

            {/* Status badge */}
            <span style={{
              display: 'inline-block',
              padding: '5px 14px', borderRadius: '20px',
              fontSize: '12px', fontWeight: 600,
              background: product.available ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
              color: product.available ? '#34D399' : '#FCA5A5',
              border: `1px solid ${product.available ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`,
              marginBottom: '16px'
            }}>
              {product.available ? '✓ Available' : '✕ Unavailable'}
            </span>

            <h1 style={{
              fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 800,
              color: '#fff', marginBottom: '6px', letterSpacing: '-0.5px'
            }}>
              {product.name}
            </h1>

            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', marginBottom: '16px', fontWeight: 500 }}>
              {product.category}
            </p>

            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', lineHeight: 1.7, marginBottom: '24px' }}>
              {product.description}
            </p>

            {/* Pricing */}
            <div style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '14px', padding: '18px', marginBottom: '24px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px' }}>Monthly Rent</span>
                <span style={{ fontWeight: 800, fontSize: '22px', color: '#60A5FA' }}>₹{product.price}/mo</span>
              </div>
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.07)'
              }}>
                <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px' }}>Security Deposit</span>
                <span style={{ fontWeight: 700, fontSize: '16px', color: '#fff' }}>₹{product.deposit}</span>
              </div>
            </div>

            {/* Features */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
              {['Free Delivery', 'Easy Return', 'Maintenance Free'].map(f => (
                <span key={f} style={{
                  padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 500,
                  background: 'rgba(59,130,246,0.1)',
                  border: '1px solid rgba(59,130,246,0.2)',
                  color: '#93C5FD'
                }}>✓ {f}</span>
              ))}
            </div>

            {product.available ? (
              <Link to={`/booking/${product.id}`} style={{
                display: 'block',
                background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
                color: '#fff', textAlign: 'center',
                padding: '14px', borderRadius: '12px',
                textDecoration: 'none', fontWeight: 700, fontSize: '15px',
                boxShadow: '0 4px 20px rgba(59,130,246,0.4)',
                transition: 'all 0.2s'
              }}>
                Book Now 🚀
              </Link>
            ) : (
              <button disabled style={{
                width: '100%',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.3)',
                padding: '14px', borderRadius: '12px',
                fontWeight: 700, fontSize: '15px', cursor: 'not-allowed'
              }}>
                Currently Unavailable
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;