import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Navbar() {
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('rentease_user')); // ✅ FIXED

  const handleLogout = () => {
    localStorage.removeItem('rentease_token');
    localStorage.removeItem('rentease_user');
    navigate('/login');
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/dashboard', label: 'Dashboard' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="top-nav" style={{
      background: 'linear-gradient(90deg, #0F172A 0%, #1E293B 100%)',
      position: 'sticky', top: 0, zIndex: 100,
      boxShadow: '0 1px 0 rgba(255,255,255,0.06), 0 4px 32px rgba(0,0,0,0.35)',
      borderBottom: '1px solid rgba(59,130,246,0.15)'
    }}>
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        padding: '0 1.5rem', height: '64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>

        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
            borderRadius: '10px', width: '36px', height: '36px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 800, color: '#fff', fontSize: '14px',
            boxShadow: '0 4px 12px rgba(59,130,246,0.4)'
          }}>RE</div>
          <span style={{ color: '#fff', fontWeight: 800, fontSize: '20px', letterSpacing: '-0.5px' }}>
            Rent<span style={{ color: '#3B82F6' }}>Ease</span>
          </span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
          {navLinks.map(link => (
            <Link key={link.to} to={link.to} style={{
              color: isActive(link.to) ? '#60A5FA' : 'rgba(255,255,255,0.65)',
              textDecoration: 'none', padding: '7px 16px', borderRadius: '8px',
              fontSize: '14px', fontWeight: isActive(link.to) ? 600 : 400,
              background: isActive(link.to) ? 'rgba(59,130,246,0.15)' : 'transparent',
              border: isActive(link.to) ? '1px solid rgba(59,130,246,0.3)' : '1px solid transparent',
              transition: 'all 0.2s ease'
            }}>
              {link.label}
            </Link>
          ))}
          {user?.role === 'admin' && (
            <Link to="/admin" style={{
              color: '#F59E0B', textDecoration: 'none',
              padding: '7px 16px', fontSize: '14px', fontWeight: 600,
              background: 'rgba(245,158,11,0.1)', borderRadius: '8px',
              border: '1px solid rgba(245,158,11,0.2)'
            }}>⚙️ Admin</Link>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Link to="/cart" style={{
            position: 'relative', color: '#fff', textDecoration: 'none',
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '10px', padding: '8px 14px',
            fontSize: '16px', display: 'flex', alignItems: 'center', gap: '6px'
          }}>
            🛒
            {cart.length > 0 && (
              <span style={{
                background: '#3B82F6', color: '#fff', borderRadius: '50%',
                width: '20px', height: '20px', fontSize: '11px', fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'absolute', top: '-8px', right: '-8px',
                boxShadow: '0 2px 8px rgba(59,130,246,0.5)'
              }}>
                {cart.length}
              </span>
            )}
          </Link>

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontWeight: 700, fontSize: '13px',
                  border: '2px solid rgba(59,130,246,0.4)'
                }}>
                  {user.name?.[0]?.toUpperCase() || 'U'}
                </div>
                <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px', fontWeight: 500 }}>
                  {user.name?.split(' ')[0]}
                </span>
              </div>
              <button onClick={handleLogout} style={{
                background: 'rgba(239,68,68,0.1)', color: '#F87171',
                border: '1px solid rgba(239,68,68,0.25)',
                padding: '7px 14px', borderRadius: '8px',
                fontWeight: 600, fontSize: '13px', cursor: 'pointer'
              }}>
                Logout
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '8px' }}>
              <Link to="/login" style={{
                color: 'rgba(255,255,255,0.8)', textDecoration: 'none',
                padding: '8px 16px', borderRadius: '8px', fontSize: '14px',
                border: '1px solid rgba(255,255,255,0.15)'
              }}>Login</Link>
              <Link to="/signup" style={{
                color: '#fff', textDecoration: 'none',
                padding: '8px 18px', borderRadius: '8px',
                fontSize: '14px', fontWeight: 700,
                background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
                boxShadow: '0 4px 14px rgba(59,130,246,0.4)'
              }}>Sign Up</Link>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .top-nav { display: none !important; } }
        @media (min-width: 769px) { .bottom-nav { display: none !important; } }
      `}</style>
    </nav>
  );
}

export function BottomNav() {
  const location = useLocation();
  const { cart } = useCart();
  const user = JSON.parse(localStorage.getItem('rentease_user')); // ✅ FIXED
  const isActive = (path) => location.pathname === path;

  const items = [
    { to: '/', icon: '🏠', label: 'Home' },
    { to: '/products', icon: '🛋️', label: 'Products' },
    { to: '/cart', icon: '🛒', label: 'Cart', badge: cart.length },
    { to: user ? '/dashboard' : '/login', icon: '👤', label: 'Account', activePath: '/dashboard' },
  ];

  return (
    <div className="bottom-nav" style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: 'linear-gradient(180deg, #0F172A 0%, #0A0F1E 100%)',
      borderTop: '1px solid rgba(59,130,246,0.2)',
      display: 'flex', justifyContent: 'space-around', alignItems: 'center',
      padding: '8px 0 16px', zIndex: 100,
      boxShadow: '0 -8px 32px rgba(0,0,0,0.4)'
    }}>
      {items.map(item => {
        const active = isActive(item.activePath || item.to);
        return (
          <Link key={item.to} to={item.to} style={{
            textDecoration: 'none', display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: '3px', position: 'relative',
            padding: '4px 16px', borderRadius: '12px',
            background: active ? 'rgba(59,130,246,0.12)' : 'transparent'
          }}>
            <span style={{ fontSize: '22px', lineHeight: 1 }}>{item.icon}</span>
            {item.badge > 0 && (
              <span style={{
                position: 'absolute', top: '0px', right: '8px',
                background: '#3B82F6', color: '#fff', borderRadius: '50%',
                width: '17px', height: '17px', fontSize: '10px', fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>{item.badge}</span>
            )}
            <span style={{
              fontSize: '11px',
              color: active ? '#60A5FA' : 'rgba(255,255,255,0.4)',
              fontWeight: active ? 700 : 400
            }}>{item.label}</span>
            {active && (
              <div style={{
                position: 'absolute', bottom: '-8px',
                width: '20px', height: '3px',
                background: '#3B82F6', borderRadius: '2px'
              }} />
            )}
          </Link>
        );
      })}
    </div>
  );
}

export default Navbar;