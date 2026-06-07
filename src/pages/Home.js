import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ paddingBottom: '70px' }}>
      
      {/* Hero Section */}
      <div style={{ background: '#0F2D5A', color: '#fff', padding: '40px 24px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(28px, 6vw, 52px)', fontWeight: 800, marginBottom: '12px', lineHeight: 1.2 }}>
          Rent Furniture & Appliances
        </h1>
        <p style={{ fontSize: 'clamp(14px, 3vw, 18px)', color: 'rgba(255,255,255,0.8)', marginBottom: '24px' }}>
          Affordable monthly rentals for students & professionals
        </p>
        <Link to="/products" style={{ background: '#FF6B35', color: '#fff', padding: '12px 32px', borderRadius: '10px', textDecoration: 'none', fontWeight: 700, fontSize: '16px' }}>
          Browse Products
        </Link>
      </div>

      {/* Why RentEase */}
      <div style={{ padding: '40px 20px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 700, color: '#0F2D5A', marginBottom: '24px' }}>
          Why RentEase?
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {[
            { icon: '💰', title: 'Affordable', desc: 'No high upfront costs — pay monthly!' },
            { icon: '🚚', title: 'Free Delivery', desc: 'We deliver & pickup at your doorstep!' },
            { icon: '🔧', title: 'Maintenance', desc: 'Free maintenance support included!' },
          ].map(item => (
            <div key={item.title} style={{ background: '#fff', borderRadius: '14px', padding: '24px 16px', textAlign: 'center', boxShadow: '0 2px 12px rgba(15,45,90,0.08)' }}>
              <div style={{ fontSize: '36px', marginBottom: '10px' }}>{item.icon}</div>
              <h3 style={{ color: '#0F2D5A', fontWeight: 700, fontSize: '17px', marginBottom: '6px' }}>{item.title}</h3>
              <p style={{ color: '#666', fontSize: '14px' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Home;