import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const user = JSON.parse(localStorage.getItem('rentease_user'));

  return (
    <div style={{ paddingBottom: '70px', background: '#0A0F1E' }}>

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #0A0F1E 100%)',
        padding: '110px 24px', textAlign: 'center',
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '350px', height: '350px', background: 'rgba(59,130,246,0.08)', borderRadius: '50%', filter: 'blur(40px)' }} />
        <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '280px', height: '280px', background: 'rgba(59,130,246,0.05)', borderRadius: '50%', filter: 'blur(40px)' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '620px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(59,130,246,0.1)',
            border: '1px solid rgba(59,130,246,0.2)',
            borderRadius: '24px', padding: '7px 20px',
            fontSize: '13px', fontWeight: 600,
            marginBottom: '28px', color: '#93C5FD'
          }}>
            🏠 Trusted by 500+ customers
          </div>

          <h1 style={{
            fontSize: 'clamp(36px, 6vw, 64px)',
            fontWeight: 900, lineHeight: 1.05,
            marginBottom: '20px', letterSpacing: '-2px', color: '#fff'
          }}>
            Rent Furniture &
            <br />
            <span style={{ color: '#3B82F6' }}>Appliances</span>
          </h1>

          <p style={{
            fontSize: 'clamp(15px, 2vw, 18px)',
            color: 'rgba(255,255,255,0.6)',
            marginBottom: '44px', lineHeight: 1.8,
            maxWidth: '440px', margin: '0 auto 44px'
          }}>
            No upfront costs. Free delivery. Flexible monthly plans.
          </p>

          <Link to="/products" style={{
            background: '#3B82F6', color: '#fff',
            padding: '16px 48px', borderRadius: '12px',
            textDecoration: 'none', fontWeight: 700, fontSize: '16px',
            display: 'inline-block',
            boxShadow: '0 8px 32px rgba(59,130,246,0.4)'
          }}>
            Browse Products →
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div style={{ background: '#0F172A', padding: '28px 24px', borderTop: '1px solid rgba(59,130,246,0.1)', borderBottom: '1px solid rgba(59,130,246,0.1)' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', textAlign: 'center' }}>
          {[
            { num: '500+', label: 'Customers', color: '#3B82F6' },
            { num: '50+', label: 'Products', color: '#fff' },
            { num: '4.8★', label: 'Rating', color: '#3B82F6' },
          ].map((stat, i) => (
            <div key={stat.label} style={{ borderRight: i < 2 ? '1px solid rgba(59,130,246,0.15)' : 'none', padding: '8px' }}>
              <div style={{ fontSize: 'clamp(22px, 4vw, 28px)', fontWeight: 800, color: stat.color }}>{stat.num}</div>
              <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Why RentEase */}
      <div style={{ padding: '70px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: 'clamp(24px, 4vw, 34px)', fontWeight: 800, color: '#fff', marginBottom: '12px', letterSpacing: '-1px' }}>
          Why RentEase?
        </h2>
        <p style={{ textAlign: 'center', color: '#64748B', marginBottom: '48px', fontSize: '15px' }}>Simple. Affordable. Reliable.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '16px' }}>
          {[
            { icon: '💰', title: 'Affordable', desc: 'Pay monthly, no upfront cost' },
            { icon: '🚚', title: 'Free Delivery', desc: 'Delivered to your doorstep' },
            { icon: '🔧', title: 'Maintenance', desc: 'Free support included' },
            { icon: '🔄', title: 'Flexible', desc: '1 to 12 month plans' },
          ].map(item => (
            <div key={item.title} style={{
              background: '#0F172A',
              borderRadius: '20px',
              padding: '32px 22px', textAlign: 'center',
              border: '1.5px solid rgba(59,130,246,0.15)',
              transition: 'border-color 0.2s',
            }}>
              <div style={{ fontSize: '36px', marginBottom: '14px' }}>{item.icon}</div>
              <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '17px', marginBottom: '8px' }}>{item.title}</h3>
              <p style={{ color: '#64748B', fontSize: '14px', lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div style={{ background: '#0F172A', padding: '70px 20px', borderTop: '1px solid rgba(59,130,246,0.1)', borderBottom: '1px solid rgba(59,130,246,0.1)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 34px)', fontWeight: 800, color: '#fff', marginBottom: '12px', letterSpacing: '-1px' }}>
            How It Works
          </h2>
          <p style={{ color: '#64748B', marginBottom: '48px', fontSize: '15px' }}>3 simple steps</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {[
              { icon: '🛋️', title: 'Choose', desc: 'Pick your product', num: '01' },
              { icon: '📅', title: 'Select', desc: 'Choose your plan', num: '02' },
              { icon: '🚚', title: 'Delivered', desc: 'Free to your door', num: '03' },
            ].map(item => (
              <div key={item.title}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#3B82F6', marginBottom: '10px', letterSpacing: '2px' }}>{item.num}</div>
                <div style={{ width: '60px', height: '60px', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', fontSize: '24px' }}>
                  {item.icon}
                </div>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: '16px', marginBottom: '6px' }}>{item.title}</div>
                <div style={{ color: '#64748B', fontSize: '13px' }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '70px 20px', textAlign: 'center', background: '#0A0F1E' }}>
        <h2 style={{ fontSize: 'clamp(24px, 4vw, 34px)', fontWeight: 800, color: '#fff', marginBottom: '12px', letterSpacing: '-1px' }}>
          Ready to Start?
        </h2>
        <p style={{ color: '#64748B', marginBottom: '32px', fontSize: '15px' }}>
          Join 500+ happy customers across India
        </p>
        <Link to="/products" style={{
          background: '#3B82F6', color: '#fff',
          padding: '16px 52px', borderRadius: '12px',
          textDecoration: 'none', fontWeight: 700, fontSize: '16px',
          display: 'inline-block',
          boxShadow: '0 8px 28px rgba(59,130,246,0.3)'
        }}>
          Start Renting Now →
        </Link>
      </div>

    </div>
  );
}

export default Home;