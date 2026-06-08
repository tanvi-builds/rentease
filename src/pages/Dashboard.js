import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const API_URL = 'https://rentease-0pao.onrender.com';

function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('rentease_user'));

  useEffect(() => {
    const token = localStorage.getItem('rentease_token');
    if (!token) { navigate('/login'); return; }
    fetchOrders(token);
  }, []);

  const fetchOrders = async (token) => {
    try {
      const res = await fetch(`${API_URL}/api/orders/my`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setOrders(data.orders);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const activeOrders = orders.filter(o => ['pending', 'confirmed', 'dispatched'].includes(o.status)).length;
  const delivered = orders.filter(o => o.status === 'delivered').length;
  const totalSpent = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  const statusStyle = {
    pending:    { bg: 'rgba(59,130,246,0.15)',  color: '#60A5FA',  label: '⏳ Pending' },
    confirmed:  { bg: 'rgba(37,99,235,0.15)',   color: '#93C5FD',  label: '✅ Confirmed' },
    dispatched: { bg: 'rgba(16,185,129,0.15)',  color: '#34D399',  label: '🚚 Dispatched' },
    delivered:  { bg: 'rgba(5,150,105,0.15)',   color: '#6EE7B7',  label: '🎉 Delivered' },
    cancelled:  { bg: 'rgba(239,68,68,0.15)',   color: '#FCA5A5',  label: '❌ Cancelled' },
  };

  const stats = [
    { icon: '📦', label: 'Total Orders',   value: orders.length,                    accent: '#3B82F6' },
    { icon: '🏠', label: 'Active Rentals', value: activeOrders,                      accent: '#10B981' },
    { icon: '✅', label: 'Delivered',       value: delivered,                         accent: '#8B5CF6' },
    { icon: '💰', label: 'Total Spent',    value: `₹${totalSpent.toLocaleString()}`, accent: '#F59E0B' },
  ];

  return (
    <div style={{ background: '#0A0F1E', minHeight: '100vh', paddingBottom: '100px' }}>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 60%, #0A0F1E 100%)',
        padding: '40px 24px 48px',
        position: 'relative', overflow: 'hidden',
        borderBottom: '1px solid rgba(59,130,246,0.15)'
      }}>
        <div style={{
          position: 'absolute', top: '-60px', right: '-60px',
          width: '300px', height: '300px',
          background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '58px', height: '58px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
                color: '#fff', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '22px', fontWeight: 800,
                border: '3px solid rgba(59,130,246,0.3)',
                boxShadow: '0 0 0 6px rgba(59,130,246,0.08)'
              }}>
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', fontWeight: 500, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>
                  My Dashboard
                </div>
                <h1 style={{ color: '#fff', fontWeight: 800, fontSize: 'clamp(20px, 4vw, 26px)', margin: 0, letterSpacing: '-0.5px' }}>
                  Welcome back, {user?.name?.split(' ')[0] || 'User'}! 👋
                </h1>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', margin: '4px 0 0' }}>
                  {user?.email}
                </p>
              </div>
            </div>
            <Link to="/products" style={{
              background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
              color: '#fff', padding: '12px 24px', borderRadius: '12px',
              textDecoration: 'none', fontWeight: 700, fontSize: '14px',
              boxShadow: '0 4px 20px rgba(59,130,246,0.4)',
              display: 'flex', alignItems: 'center', gap: '8px'
            }}>
              + New Rental
            </Link>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '14px' }}>
            {stats.map(stat => (
              <div key={stat.label} style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px', padding: '20px',
                position: 'relative', overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                  background: `linear-gradient(90deg, ${stat.accent}, transparent)`
                }} />
                <div style={{ fontSize: '26px', marginBottom: '10px' }}>{stat.icon}</div>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#fff', lineHeight: 1 }}>{stat.value}</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', marginTop: '6px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Orders */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '28px 20px' }}>
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '20px', overflow: 'hidden', marginBottom: '20px'
        }}>
          <div style={{
            padding: '18px 24px', borderBottom: '1px solid rgba(255,255,255,0.07)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            background: 'rgba(59,130,246,0.05)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3B82F6', boxShadow: '0 0 8px #3B82F6' }} />
              <h2 style={{ fontWeight: 700, fontSize: '16px', color: '#fff', margin: 0 }}>My Rentals</h2>
            </div>
            <span style={{
              fontSize: '12px', color: 'rgba(255,255,255,0.4)',
              background: 'rgba(255,255,255,0.06)', padding: '4px 10px', borderRadius: '20px'
            }}>{orders.length} orders</span>
          </div>

          {loading ? (
            <div style={{ padding: '60px', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '14px' }}>⏳</div>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>Loading your orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <div style={{ padding: '60px 24px', textAlign: 'center' }}>
              <div style={{ fontSize: '52px', marginBottom: '16px' }}>📭</div>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px', marginBottom: '8px', fontWeight: 600 }}>No orders yet!</p>
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px', marginBottom: '24px' }}>Tumhi abhi tak kahi rent nahi kela.</p>
              <Link to="/products" style={{
                background: 'linear-gradient(135deg, #3B82F6, #2563EB)', color: '#fff',
                padding: '11px 28px', borderRadius: '10px',
                textDecoration: 'none', fontWeight: 700, fontSize: '14px'
              }}>Browse Products</Link>
            </div>
          ) : (
            orders.map((order, idx) => {
              const s = statusStyle[order.status] || statusStyle.pending;
              return (
                <div key={order._id} style={{
                  padding: '18px 24px',
                  borderBottom: idx < orders.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  flexWrap: 'wrap', gap: '12px'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                      <span style={{ fontWeight: 700, fontSize: '14px', color: '#fff' }}>
                        #{order._id.slice(-6).toUpperCase()}
                      </span>
                      <span style={{
                        padding: '3px 12px', borderRadius: '20px',
                        fontSize: '11px', fontWeight: 600,
                        background: s.bg, color: s.color, border: `1px solid ${s.color}30`
                      }}>{s.label}</span>
                    </div>
                    <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', marginBottom: '4px' }}>
                      {order.items?.map(i => i.name).join(', ')}
                    </div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>
                      {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      {order.address?.city && ` · ${order.address.city}`}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 800, fontSize: '20px', color: '#60A5FA' }}>
                      ₹{order.totalAmount?.toLocaleString()}
                    </div>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '3px' }}>
                      {order.paymentMethod === 'cod' ? '💵 Cash on Delivery' : '💳 Online'}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Quick Links */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
          {[
            { to: '/products', label: 'Browse Products', icon: '🛋️' },
            { to: '/cart', label: 'My Cart', icon: '🛒' },
          ].map(item => (
            <Link key={item.to} to={item.to} style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '16px 20px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '14px', textDecoration: 'none',
              color: '#fff', fontWeight: 600, fontSize: '14px'
            }}>
              <span style={{ fontSize: '22px' }}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;