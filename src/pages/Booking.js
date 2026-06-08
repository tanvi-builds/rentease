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
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0A0F1E 0%, #0F172A 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px'
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '24px', padding: '48px 40px',
          textAlign: 'center', maxWidth: '440px', width: '100%',
          position: 'relative', overflow: 'hidden',
          boxShadow: '0 24px 64px rgba(0,0,0,0.4)'
        }}>
          <div style={{
            position: 'absolute', top: 0, left: '10%', right: '10%', height: '2px',
            background: 'linear-gradient(90deg, transparent, #10B981, transparent)'
          }} />
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎉</div>
          <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
            Booking Confirmed!
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px', marginBottom: '32px' }}>
            Your {product.name} will be delivered on {date}!
          </p>
          <Link to="/dashboard" style={{
            background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
            color: '#fff', padding: '12px 32px', borderRadius: '12px',
            textDecoration: 'none', fontWeight: 700, fontSize: '14px',
            boxShadow: '0 4px 20px rgba(59,130,246,0.4)'
          }}>
            View My Bookings
          </Link>
        </div>
      </div>
    );
  }

  const inputStyle = {
    width: '100%', boxSizing: 'border-box',
    background: 'rgba(255,255,255,0.06)',
    border: '1.5px solid rgba(255,255,255,0.1)',
    borderRadius: '10px', padding: '12px 16px',
    fontSize: '14px', outline: 'none',
    color: '#fff', transition: 'border-color 0.2s'
  };

  const labelStyle = {
    display: 'block', fontWeight: 600, fontSize: '13px',
    color: 'rgba(255,255,255,0.7)', marginBottom: '8px'
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0A0F1E 0%, #0F172A 100%)',
      padding: '40px 20px 100px'
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        <Link to={`/products/${product.id}`} style={{
          color: '#60A5FA', fontWeight: 600, textDecoration: 'none',
          fontSize: '14px', display: 'inline-block', marginBottom: '24px'
        }}>
          ← Back to Product
        </Link>

        <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#fff', marginBottom: '32px', letterSpacing: '-0.5px' }}>
          Complete Your Booking
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }} className="booking-grid">

          {/* Product Summary */}
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '20px', padding: '24px',
            position: 'relative', overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute', top: 0, left: '10%', right: '10%', height: '2px',
              background: 'linear-gradient(90deg, transparent, #3B82F6, transparent)'
            }} />

            <img src={product.image} alt={product.name} style={{
              width: '100%', height: '180px', objectFit: 'cover',
              borderRadius: '12px', marginBottom: '16px',
              border: '1px solid rgba(255,255,255,0.08)'
            }} />

            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
              {product.name}
            </h3>

            {/* Tenure */}
            <p style={{ fontWeight: 600, fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginBottom: '10px' }}>
              Select Tenure:
            </p>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
              {[1, 3, 6, 12].map(t => (
                <button key={t} onClick={() => setTenure(t)} style={{
                  padding: '8px 14px', borderRadius: '8px',
                  fontWeight: 600, fontSize: '13px', cursor: 'pointer',
                  border: 'none', transition: 'all 0.2s',
                  background: tenure === t
                    ? 'linear-gradient(135deg, #3B82F6, #2563EB)'
                    : 'rgba(255,255,255,0.07)',
                  color: tenure === t ? '#fff' : 'rgba(255,255,255,0.5)',
                  boxShadow: tenure === t ? '0 2px 10px rgba(59,130,246,0.3)' : 'none'
                }}>
                  {t}M
                </button>
              ))}
            </div>

            {/* Price Summary */}
            <div style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '12px', padding: '16px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px' }}>Monthly Rent x {tenure}</span>
                <span style={{ fontWeight: 600, color: '#fff', fontSize: '13px' }}>₹{product.price * tenure}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px' }}>Security Deposit</span>
                <span style={{ fontWeight: 600, color: '#fff', fontSize: '13px' }}>₹{product.deposit}</span>
              </div>
              <div style={{
                borderTop: '1px solid rgba(255,255,255,0.08)',
                paddingTop: '12px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
              }}>
                <span style={{ fontWeight: 700, color: '#fff', fontSize: '14px' }}>Total Payable</span>
                <span style={{ fontWeight: 800, color: '#60A5FA', fontSize: '22px' }}>₹{total}</span>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '20px', padding: '24px',
            position: 'relative', overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute', top: 0, left: '10%', right: '10%', height: '2px',
              background: 'linear-gradient(90deg, transparent, #8B5CF6, transparent)'
            }} />

            <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#fff', marginBottom: '24px' }}>
              Delivery Details
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label style={labelStyle}>Delivery Address</label>
                <textarea
                  placeholder="Enter your full delivery address"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  style={{ ...inputStyle, height: '110px', resize: 'none' }}
                  onFocus={e => e.target.style.borderColor = '#3B82F6'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>
              <div>
                <label style={labelStyle}>Delivery Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  style={{ ...inputStyle, colorScheme: 'dark' }}
                  onFocus={e => e.target.style.borderColor = '#3B82F6'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>
              <button
                onClick={handleBooking}
                style={{
                  background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
                  color: '#fff', padding: '14px', borderRadius: '12px',
                  border: 'none', fontWeight: 700, fontSize: '15px',
                  cursor: 'pointer', marginTop: '8px',
                  boxShadow: '0 4px 20px rgba(59,130,246,0.4)',
                  transition: 'all 0.2s'
                }}
              >
                Confirm Booking 🚀
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .booking-grid { grid-template-columns: 1fr !important; }
        }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(1); }
      `}</style>
    </div>
  );
}

export default Booking;