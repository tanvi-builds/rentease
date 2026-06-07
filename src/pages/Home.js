import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ paddingBottom: '70px' }}>

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #0F2D5A, #1a4a8a)',
        color: '#fff', padding: '70px 24px', textAlign: 'center'
      }}>
        <h1 style={{ fontSize: 'clamp(30px, 6vw, 58px)', fontWeight: 800, lineHeight: 1.15, marginBottom: '16px' }}>
          Rent Furniture &<br />
          <span style={{ color: '#FF6B35' }}>Appliances</span>
        </h1>
        <p style={{ fontSize: 'clamp(14px, 2.5vw, 18px)', color: 'rgba(255,255,255,0.75)', marginBottom: '32px', maxWidth: '420px', margin: '0 auto 32px' }}>
          Monthly rentals for students & professionals. No upfront cost.
        </p>
        <Link to="/products" style={{
          background: '#FF6B35', color: '#fff',
          padding: '14px 36px', borderRadius: '12px',
          textDecoration: 'none', fontWeight: 700, fontSize: '16px',
          boxShadow: '0 4px 20px rgba(255,107,53,0.35)'
        }}>
          Browse Products
        </Link>
      </div>

      {/* Features */}
      <div style={{ padding: '50px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 800, color: '#0F2D5A', marginBottom: '32px' }}>
          Why RentEase?
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {[
            { icon: '💰', title: 'Affordable', desc: 'Pay monthly, no upfront cost' },
            { icon: '🚚', title: 'Free Delivery', desc: 'Delivered to your doorstep' },
            { icon: '🔧', title: 'Maintenance', desc: 'Free support included' },
            { icon: '🔄', title: 'Flexible', desc: '1, 3, 6 or 12 month plans' },
          ].map(item => (
            <div key={item.title} style={{
              background: '#fff', borderRadius: '14px',
              padding: '24px 16px', textAlign: 'center',
              boxShadow: '0 2px 12px rgba(15,45,90,0.07)',
              border: '1px solid rgba(15,45,90,0.06)'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>{item.icon}</div>
              <h3 style={{ color: '#0F2D5A', fontWeight: 700, fontSize: '16px', marginBottom: '6px' }}>{item.title}</h3>
              <p style={{ color: '#888', fontSize: '13px' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div style={{ background: '#0F2D5A', padding: '50px 20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 800, color: '#fff', marginBottom: '32px' }}>
            How It Works
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '24px' }}>
            {[
              { step: '1', icon: '🛋️', title: 'Choose Product' },
              { step: '2', icon: '📅', title: 'Select Tenure' },
              { step: '3', icon: '🚚', title: 'Get Delivered' },
            ].map(item => (
              <div key={item.step} style={{ color: '#fff' }}>
                <div style={{ width: '52px', height: '52px', background: '#FF6B35', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: '22px' }}>
                  {item.icon}
                </div>
                <div style={{ fontWeight: 700, fontSize: '15px' }}>{item.title}</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', marginTop: '4px' }}>Step {item.step}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

export default Home;