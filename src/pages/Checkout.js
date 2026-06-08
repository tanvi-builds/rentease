import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const API_URL = 'https://rentease-0pao.onrender.com';

function Checkout() {
  const { cart, totalAmount, clearCart } = useCart();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [ordered, setOrdered] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (cart.length === 0 && !ordered) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0A0F1E 0%, #0F172A 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '80px', marginBottom: '24px' }}>🛒</div>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>Cart is Empty!</h2>
          <Link to="/products" style={{
            background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
            color: '#fff', padding: '12px 32px', borderRadius: '12px',
            textDecoration: 'none', fontWeight: 700,
            boxShadow: '0 4px 20px rgba(59,130,246,0.4)'
          }}>Browse Products</Link>
        </div>
      </div>
    );
  }

  const handleOrder = async () => {
    if (!name || !phone || !address || !date) {
      alert('Please fill all details!');
      return;
    }
    const token = localStorage.getItem('rentease_token');
    if (!token) {
      alert('Please login first!');
      navigate('/login');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          items: cart.map(item => ({
            productId: item.id,
            name: item.name,
            image: item.image,
            pricePerMonth: item.price,
            tenure: item.tenure,
            quantity: item.quantity || 1
          })),
          totalAmount,
          address: { fullName: name, phone, street: address, city: '', state: '', pincode: '' },
          paymentMethod: 'cod'
        })
      });
      const data = await response.json();
      if (data.success) {
        clearCart();
        setOrdered(true);
      } else {
        alert('Order failed: ' + data.message);
      }
    } catch (err) {
      alert('Network error. Please try again!');
    } finally {
      setLoading(false);
    }
  };

  if (ordered) {
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
            Order Confirmed!
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', marginBottom: '4px' }}>
            Thank you {name}!
          </p>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', marginBottom: '32px' }}>
            Your items will be delivered on {date}!
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <Link to="/dashboard" style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: '#fff', padding: '11px 24px', borderRadius: '10px',
              textDecoration: 'none', fontWeight: 700, fontSize: '14px'
            }}>View Dashboard</Link>
            <Link to="/products" style={{
              background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
              color: '#fff', padding: '11px 24px', borderRadius: '10px',
              textDecoration: 'none', fontWeight: 700, fontSize: '14px',
              boxShadow: '0 4px 16px rgba(59,130,246,0.35)'
            }}>Shop More</Link>
          </div>
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
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

        <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#fff', marginBottom: '32px', letterSpacing: '-0.5px' }}>
          Checkout 🚀
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px', alignItems: 'start' }}
          className="checkout-grid">

          {/* Delivery Form */}
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '20px', padding: '28px',
            position: 'relative', overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute', top: 0, left: '10%', right: '10%', height: '2px',
              background: 'linear-gradient(90deg, transparent, #3B82F6, transparent)'
            }} />
            <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#fff', marginBottom: '24px' }}>
              Delivery Details
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label style={labelStyle}>Full Name</label>
                <input type="text" placeholder="Enter your name" value={name}
                  onChange={e => setName(e.target.value)} style={inputStyle}
                  onFocus={e => e.target.style.borderColor = '#3B82F6'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
              </div>
              <div>
                <label style={labelStyle}>Phone Number</label>
                <input type="tel" placeholder="Enter your phone number" value={phone}
                  onChange={e => setPhone(e.target.value)} style={inputStyle}
                  onFocus={e => e.target.style.borderColor = '#3B82F6'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
              </div>
              <div>
                <label style={labelStyle}>Delivery Address</label>
                <textarea placeholder="Enter your full address" value={address}
                  onChange={e => setAddress(e.target.value)}
                  style={{ ...inputStyle, height: '100px', resize: 'none' }}
                  onFocus={e => e.target.style.borderColor = '#3B82F6'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
              </div>
              <div>
                <label style={labelStyle}>Delivery Date</label>
                <input type="date" value={date}
                  onChange={e => setDate(e.target.value)}
                  style={{ ...inputStyle, colorScheme: 'dark' }}
                  onFocus={e => e.target.style.borderColor = '#3B82F6'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
              </div>
            </div>
          </div>

          {/* Order Summary */}
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
            <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#fff', marginBottom: '20px' }}>
              Order Summary
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
              {cart.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p style={{ fontWeight: 600, color: '#fff', fontSize: '14px', marginBottom: '2px' }}>{item.name}</p>
                    <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px' }}>{item.tenure} month(s)</p>
                  </div>
                  <p style={{ fontWeight: 700, color: '#60A5FA', fontSize: '14px' }}>
                    ₹{item.price * item.tenure + item.deposit}
                  </p>
                </div>
              ))}
            </div>
            <div style={{
              borderTop: '1px solid rgba(255,255,255,0.08)',
              paddingTop: '16px', marginBottom: '20px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
              <span style={{ fontWeight: 700, color: '#fff', fontSize: '15px' }}>Total</span>
              <span style={{ fontWeight: 800, color: '#60A5FA', fontSize: '22px' }}>₹{totalAmount}</span>
            </div>
            <button
              onClick={handleOrder}
              disabled={loading}
              style={{
                width: '100%',
                background: loading ? 'rgba(59,130,246,0.4)' : 'linear-gradient(135deg, #3B82F6, #2563EB)',
                color: '#fff', padding: '14px', borderRadius: '12px', border: 'none',
                fontWeight: 700, fontSize: '15px',
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: loading ? 'none' : '0 4px 20px rgba(59,130,246,0.35)',
                transition: 'all 0.2s'
              }}
            >
              {loading ? 'Placing Order...' : 'Place Order 🎉'}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .checkout-grid { grid-template-columns: 1fr !important; }
        }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(1); }
      `}</style>
    </div>
  );
}

export default Checkout;