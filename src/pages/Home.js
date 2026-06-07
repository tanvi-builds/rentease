import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div style={{ paddingBottom: '70px' }}>

      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #0F2D5A 0%, #1a4a8a 100%)',
        color: '#fff', padding: '60px 24px 70px', textAlign: 'center',
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px', background: 'rgba(255,107,53,0.1)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '-60px', left: '-30px', width: '250px', height: '250px', background: 'rgba(255,107,53,0.08)', borderRadius: '50%' }} />
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-block', background: 'rgba(255,107,53,0.2)', border: '1px solid rgba(255,107,53,0.4)', borderRadius: '20px', padding: '6px 16px', fontSize: '13px', marginBottom: '20px', color: '#FF6B35', fontWeight: 600 }}>
            🏠 India's #1 Furniture Rental Platform
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 7vw, 64px)', fontWeight: 800, marginBottom: '16px', lineHeight: 1.1, letterSpacing: '-1px' }}>
            Rent Furniture &<br />
            <span style={{ color: '#FF6B35' }}>Appliances</span> Easily
          </h1>
          <p style={{ fontSize: 'clamp(15px, 2.5vw, 20px)', color: 'rgba(255,255,255,0.75)', marginBottom: '32px', maxWidth: '500px', margin: '0 auto 32px' }}>
            No upfront costs. Free delivery. Cancel anytime. Perfect for students & professionals.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/products" style={{ background: '#FF6B35', color: '#fff', padding: '14px 32px', borderRadius: '12px', textDecoration: 'none', fontWeight: 700, fontSize: '16px', boxShadow: '0 4px 20px rgba(255,107,53,0.4)' }}>
              Browse Products 🛋️
            </Link>
            {!user && (
              <Link to="/signup" style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', padding: '14px 32px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600, fontSize: '16px', border: '1px solid rgba(255,255,255,0.25)' }}>
                Sign Up Free
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div style={{ background: '#FF6B35', padding: '20px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', textAlign: 'center', gap: '16px' }}>
          {[
            { num: '500+', label: 'Happy Customers' },
            { num: '50+', label: 'Products Available' },
            { num: '4.8★', label: 'Average Rating' },
          ].map(stat => (
            <div key={stat.label}>
              <div style={{ fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: 800, color: '#fff' }}>{stat.num}</div>
              <div style={{ fontSize: 'clamp(11px, 2vw, 14px)', color: 'rgba(255,255,255,0.85)' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Why RentEase */}
      <div style={{ padding: '50px 20px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, color: '#0F2D5A', marginBottom: '8px' }}>
          Why Choose RentEase?
        </h2>
        <p style={{ textAlign: 'center', color: '#888', marginBottom: '36px', fontSize: '15px' }}>
          Everything you need, nothing you don't
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          {[
            { icon: '💰', title: 'Affordable', desc: 'No high upfront costs — pay monthly at unbeatable prices!', color: '#fff7ed' },
            { icon: '🚚', title: 'Free Delivery', desc: 'We deliver & pickup at your doorstep, absolutely free!', color: '#f0fdf4' },
            { icon: '🔧', title: 'Free Maintenance', desc: 'Any issue? We fix it for free during your rental period!', color: '#eff6ff' },
            { icon: '🔄', title: 'Flexible Plans', desc: 'Choose 1, 3, 6 or 12 month plans — upgrade anytime!', color: '#fdf4ff' },
          ].map(item => (
            <div key={item.title} style={{ background: item.color, borderRadius: '16px', padding: '28px 20px', textAlign: 'center', border: '1px solid rgba(15,45,90,0.06)', transition: 'transform 0.2s' }}>
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>{item.icon}</div>
              <h3 style={{ color: '#0F2D5A', fontWeight: 700, fontSize: '17px', marginBottom: '8px' }}>{item.title}</h3>
              <p style={{ color: '#666', fontSize: '14px', lineHeight: 1.5 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div style={{ background: '#0F2D5A', padding: '50px 20px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
            How It Works
          </h2>
          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)', marginBottom: '36px', fontSize: '15px' }}>
            3 simple steps to get started
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
            {[
              { step: '01', title: 'Choose Product', desc: 'Browse our catalog and pick what you need', icon: '🛋️' },
              { step: '02', title: 'Select Tenure', desc: 'Pick 1, 3, 6 or 12 months — your choice!', icon: '📅' },
              { step: '03', title: 'Get Delivered', desc: 'We deliver to your doorstep for free!', icon: '🚚' },
            ].map(item => (
              <div key={item.step} style={{ textAlign: 'center', padding: '20px' }}>
                <div style={{ width: '60px', height: '60px', background: '#FF6B35', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '24px' }}>
                  {item.icon}
                </div>
                <div style={{ color: '#FF6B35', fontWeight: 700, fontSize: '13px', marginBottom: '6px' }}>STEP {item.step}</div>
                <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '17px', marginBottom: '8px' }}>{item.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div style={{ padding: '50px 20px', textAlign: 'center', background: '#E8F4FD' }}>
        <h2 style={{ fontSize: 'clamp(22px, 4vw, 36px)', fontWeight: 800, color: '#0F2D5A', marginBottom: '12px' }}>
          Ready to Get Started? 🚀
        </h2>
        <p style={{ color: '#666', marginBottom: '24px', fontSize: '15px' }}>
          Join 500+ happy customers renting with RentEase
        </p>
        <Link to="/products" style={{ background: '#FF6B35', color: '#fff', padding: '14px 40px', borderRadius: '12px', textDecoration: 'none', fontWeight: 700, fontSize: '16px', display: 'inline-block' }}>
          Start Renting Now 🛋️
        </Link>
      </div>

    </div>
  );
}

export default Home;