import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Cart() {
  const { cart, removeFromCart, updateTenure, totalAmount } = useCart();

  if (cart.length === 0) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0A0F1E 0%, #0F172A 50%, #1E293B 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '80px', marginBottom: '24px' }}>🛒</div>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#fff', marginBottom: '12px', letterSpacing: '-0.5px' }}>
            Your Cart is Empty!
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '15px', marginBottom: '32px' }}>
            Add some products to get started!
          </p>
          <Link to="/products" style={{
            background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
            color: '#fff', padding: '12px 32px', borderRadius: '12px',
            textDecoration: 'none', fontWeight: 700, fontSize: '15px',
            boxShadow: '0 4px 20px rgba(59,130,246,0.4)'
          }}>
            Browse Products
          </Link>
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

        <h1 style={{
          fontSize: '28px', fontWeight: 800, color: '#fff',
          marginBottom: '32px', letterSpacing: '-0.5px'
        }}>My Cart 🛒</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 320px', gap: '24px', alignItems: 'start' }}
            className="cart-grid">

            {/* Cart Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {cart.map(item => (
                <div key={item.id} style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px', padding: '20px',
                  display: 'flex', gap: '16px', alignItems: 'center',
                  transition: 'border-color 0.2s'
                }}>
                  <img src={item.image} alt={item.name} style={{
                    width: '90px', height: '72px', objectFit: 'cover',
                    borderRadius: '10px', flexShrink: 0,
                    border: '1px solid rgba(255,255,255,0.08)'
                  }} />
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>
                      {item.name}
                    </h3>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', marginBottom: '12px' }}>
                      {item.category}
                    </p>
                    {/* Tenure Buttons */}
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {[1, 3, 6, 12].map(t => (
                        <button
                          key={t}
                          onClick={() => updateTenure(item.id, t)}
                          style={{
                            padding: '5px 12px', borderRadius: '8px',
                            fontSize: '12px', fontWeight: 600, cursor: 'pointer',
                            transition: 'all 0.2s', border: 'none',
                            background: item.tenure === t
                              ? 'linear-gradient(135deg, #3B82F6, #2563EB)'
                              : 'rgba(255,255,255,0.07)',
                            color: item.tenure === t ? '#fff' : 'rgba(255,255,255,0.5)',
                            boxShadow: item.tenure === t ? '0 2px 8px rgba(59,130,246,0.3)' : 'none'
                          }}
                        >
                          {t}M
                        </button>
                      ))}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <p style={{ fontWeight: 800, fontSize: '18px', color: '#60A5FA', marginBottom: '4px' }}>
                      ₹{item.price * item.tenure}
                    </p>
                    <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', marginBottom: '10px' }}>
                      +₹{item.deposit} deposit
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        background: 'rgba(239,68,68,0.1)',
                        border: '1px solid rgba(239,68,68,0.2)',
                        color: '#FCA5A5', fontSize: '12px', fontWeight: 600,
                        padding: '4px 10px', borderRadius: '6px', cursor: 'pointer'
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '20px', padding: '24px',
              position: 'relative', overflow: 'hidden'
            }}>
              {/* Top accent */}
              <div style={{
                position: 'absolute', top: 0, left: '10%', right: '10%', height: '2px',
                background: 'linear-gradient(90deg, transparent, #3B82F6, transparent)'
              }} />

              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#fff', marginBottom: '20px' }}>
                Order Summary
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                {cart.map(item => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px' }}>
                      {item.name} x{item.tenure}M
                    </span>
                    <span style={{ fontWeight: 600, fontSize: '13px', color: '#fff' }}>
                      ₹{item.price * item.tenure + item.deposit}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{
                borderTop: '1px solid rgba(255,255,255,0.08)',
                paddingTop: '16px', marginTop: '4px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
              }}>
                <span style={{ fontWeight: 700, color: '#fff', fontSize: '15px' }}>Total</span>
                <span style={{ fontWeight: 800, color: '#60A5FA', fontSize: '22px' }}>₹{totalAmount}</span>
              </div>

              <Link to="/checkout" style={{
                display: 'block',
                background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
                color: '#fff', textAlign: 'center',
                padding: '14px', borderRadius: '12px',
                textDecoration: 'none', fontWeight: 700, fontSize: '15px',
                marginTop: '20px',
                boxShadow: '0 4px 20px rgba(59,130,246,0.35)'
              }}>
                Proceed to Checkout 🚀
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .cart-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

export default Cart;