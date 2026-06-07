import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
    setIsOpen(false);
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/dashboard', label: 'Dashboard' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{ background: '#0F2D5A', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 20px rgba(0,0,0,0.15)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ background: '#FF6B35', borderRadius: '8px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#fff', fontSize: '14px' }}>RE</div>
          <span style={{ color: '#fff', fontWeight: 700, fontSize: '20px' }}>Rent<span style={{ color: '#FF6B35' }}>Ease</span></span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="desktop-links">
          {navLinks.map(link => (
            <Link key={link.to} to={link.to} style={{
              color: isActive(link.to) ? '#FF6B35' : 'rgba(255,255,255,0.85)',
              textDecoration: 'none', padding: '6px 14px', borderRadius: '6px',
              fontSize: '14px', fontWeight: isActive(link.to) ? 600 : 400,
              background: isActive(link.to) ? 'rgba(255,107,53,0.12)' : 'transparent',
            }}>
              {link.label}
            </Link>
          ))}
          {user?.role === 'admin' && (
            <Link to="/admin" style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none', padding: '6px 14px', fontSize: '14px' }}>Admin</Link>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} className="desktop-links">
          <Link to="/cart" style={{ position: 'relative', color: '#fff', textDecoration: 'none', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px 14px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            🛒
            {cart.length > 0 && (
              <span style={{ background: '#FF6B35', color: '#fff', borderRadius: '50%', width: '18px', height: '18px', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', top: '-6px', right: '-6px' }}>
                {cart.length}
              </span>
            )}
          </Link>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: '#fff', fontSize: '14px', fontWeight: 500 }}>Hi, {user.name}! 👋</span>
              <button onClick={handleLogout} style={{ background: '#FF6B35', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}>
                Logout
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '8px' }}>
              <Link to="/login" style={{ color: '#fff', textDecoration: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '14px', border: '1px solid rgba(255,255,255,0.3)' }}>Login</Link>
              <Link to="/signup" style={{ color: '#fff', textDecoration: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, background: '#FF6B35' }}>Sign Up</Link>
            </div>
          )}
        </div>

        <button onClick={() => setIsOpen(!isOpen)} style={{ display: 'none', background: 'transparent', border: 'none', color: '#fff', fontSize: '24px', cursor: 'pointer' }} className="mobile-btn">
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      {isOpen && (
        <div style={{ background: '#0a2248', padding: '12px 1.5rem 16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          {navLinks.map(link => (
            <Link key={link.to} to={link.to} onClick={() => setIsOpen(false)} style={{ display: 'block', color: isActive(link.to) ? '#FF6B35' : 'rgba(255,255,255,0.85)', textDecoration: 'none', padding: '12px 0', fontSize: '15px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              {link.label}
            </Link>
          ))}
          <Link to="/cart" onClick={() => setIsOpen(false)} style={{ display: 'block', color: 'rgba(255,255,255,0.85)', textDecoration: 'none', padding: '12px 0', fontSize: '15px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            🛒 Cart {cart.length > 0 && `(${cart.length})`}
          </Link>
          {user ? (
            <button onClick={handleLogout} style={{ marginTop: '12px', width: '100%', padding: '12px', background: '#FF6B35', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '15px', fontWeight: 600, cursor: 'pointer' }}>
              Logout
            </button>
          ) : (
            <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
              <Link to="/login" onClick={() => setIsOpen(false)} style={{ flex: 1, textAlign: 'center', padding: '11px', background: 'rgba(255,255,255,0.1)', color: '#fff', textDecoration: 'none', borderRadius: '8px', fontSize: '14px' }}>Login</Link>
              <Link to="/signup" onClick={() => setIsOpen(false)} style={{ flex: 1, textAlign: 'center', padding: '11px', background: '#FF6B35', color: '#fff', textDecoration: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 600 }}>Sign Up</Link>
            </div>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-links { display: none !important; }
          .mobile-btn { display: block !important; }
        }
        @media (min-width: 769px) {
          .bottom-nav { display: none !important; }
        }
      `}</style>
    </nav>
  );
}

export function BottomNav() {
  const location = useLocation();
  const { cart } = useCart();
  const user = JSON.parse(localStorage.getItem('user'));
  const isActive = (path) => location.pathname === path;

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: '#fff', borderTop: '1px solid #e5e7eb',
      display: 'flex', justifyContent: 'space-around', alignItems: 'center',
      padding: '8px 0 12px', zIndex: 100,
      boxShadow: '0 -4px 12px rgba(0,0,0,0.08)'
    }} className="bottom-nav">
      
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
        <span style={{ fontSize: '22px' }}>🏠</span>
        <span style={{ fontSize: '11px', color: isActive('/') ? '#FF6B35' : '#888', fontWeight: isActive('/') ? 700 : 400 }}>Home</span>
      </Link>

      <Link to="/products" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
        <span style={{ fontSize: '22px' }}>🛋️</span>
        <span style={{ fontSize: '11px', color: isActive('/products') ? '#FF6B35' : '#888', fontWeight: isActive('/products') ? 700 : 400 }}>Products</span>
      </Link>

      <Link to="/cart" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', position: 'relative' }}>
        <span style={{ fontSize: '22px' }}>🛒</span>
        {cart.length > 0 && (
          <span style={{ position: 'absolute', top: '-4px', right: '-4px', background: '#FF6B35', color: '#fff', borderRadius: '50%', width: '16px', height: '16px', fontSize: '10px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {cart.length}
          </span>
        )}
        <span style={{ fontSize: '11px', color: isActive('/cart') ? '#FF6B35' : '#888', fontWeight: isActive('/cart') ? 700 : 400 }}>Cart</span>
      </Link>

      <Link to={user ? '/dashboard' : '/login'} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
        <span style={{ fontSize: '22px' }}>👤</span>
        <span style={{ fontSize: '11px', color: isActive('/dashboard') ? '#FF6B35' : '#888', fontWeight: isActive('/dashboard') ? 700 : 400 }}>Account</span>
      </Link>

    </div>
  );
}

export default Navbar;