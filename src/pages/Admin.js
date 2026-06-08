import React, { useState } from 'react';

const initialProducts = [
  { id: 1, name: "3-Seater Sofa", category: "Furniture", price: 599, deposit: 1000, available: true },
  { id: 2, name: "King Size Bed", category: "Furniture", price: 799, deposit: 1500, available: true },
  { id: 3, name: "Dining Table", category: "Furniture", price: 499, deposit: 800, available: false },
  { id: 4, name: "Wardrobe", category: "Furniture", price: 699, deposit: 1200, available: true },
  { id: 5, name: "Study Table", category: "Furniture", price: 399, deposit: 600, available: true },
  { id: 6, name: "Bookshelf", category: "Furniture", price: 299, deposit: 500, available: true },
  { id: 7, name: "Refrigerator", category: "Appliances", price: 699, deposit: 1200, available: true },
  { id: 8, name: "Washing Machine", category: "Appliances", price: 599, deposit: 1000, available: true },
  { id: 9, name: "Smart TV 43 inch", category: "Appliances", price: 799, deposit: 1500, available: false },
  { id: 10, name: "Air Conditioner", category: "Appliances", price: 899, deposit: 1800, available: true },
  { id: 11, name: "Microwave", category: "Appliances", price: 349, deposit: 600, available: true },
  { id: 12, name: "Water Purifier", category: "Appliances", price: 299, deposit: 500, available: true },
];

const orders = [
  { id: 1, user: "Tanvi Sonar", product: "King Size Bed", tenure: 1, total: 2299, status: "Active", date: "2026-06-03" },
  { id: 2, user: "Rahul Sharma", product: "Refrigerator", tenure: 3, total: 3297, status: "Active", date: "2026-05-20" },
  { id: 3, user: "Priya Patil", product: "3-Seater Sofa", tenure: 6, total: 4594, status: "Completed", date: "2026-04-01" },
];

function Admin() {
  const [products, setProducts] = useState(initialProducts);
  const [activeTab, setActiveTab] = useState("products");

  const toggleAvailability = (id) => {
    setProducts(products.map(p => p.id === id ? { ...p, available: !p.available } : p));
  };

  const stats = [
    { icon: '📦', label: 'Total Products', value: '12', accent: '#3B82F6' },
    { icon: '✅', label: 'Total Orders', value: '3', accent: '#10B981' },
    { icon: '👥', label: 'Total Users', value: '3', accent: '#8B5CF6' },
    { icon: '💰', label: 'Total Revenue', value: '₹10,190', accent: '#F59E0B' },
  ];

  const thStyle = {
    padding: '14px 16px', textAlign: 'left',
    fontSize: '12px', fontWeight: 600,
    color: 'rgba(255,255,255,0.5)',
    letterSpacing: '0.5px', textTransform: 'uppercase',
    borderBottom: '1px solid rgba(255,255,255,0.07)'
  };

  const tdStyle = {
    padding: '14px 16px', fontSize: '14px',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    color: 'rgba(255,255,255,0.7)'
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0A0F1E 0%, #0F172A 100%)',
      padding: '40px 20px 100px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#fff', marginBottom: '6px', letterSpacing: '-0.5px' }}>
            Admin Panel ⚙️
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>
            Manage your RentEase platform
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '32px' }}>
          {stats.map(stat => (
            <div key={stat.label} style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '16px', padding: '20px',
              textAlign: 'center', position: 'relative', overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                background: `linear-gradient(90deg, transparent, ${stat.accent}, transparent)`
              }} />
              <div style={{ fontSize: '28px', marginBottom: '10px' }}>{stat.icon}</div>
              <div style={{ fontSize: '26px', fontWeight: 800, color: '#fff', lineHeight: 1 }}>{stat.value}</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '6px' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
          {['products', 'orders'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: '9px 24px', borderRadius: '10px',
              fontWeight: 600, fontSize: '14px', cursor: 'pointer',
              border: 'none', transition: 'all 0.2s',
              background: activeTab === tab
                ? 'linear-gradient(135deg, #3B82F6, #2563EB)'
                : 'rgba(255,255,255,0.06)',
              color: activeTab === tab ? '#fff' : 'rgba(255,255,255,0.5)',
              boxShadow: activeTab === tab ? '0 4px 14px rgba(59,130,246,0.35)' : 'none',
              textTransform: 'capitalize'
            }}>
              {tab === 'products' ? '📦 Products' : '🧾 Orders'}
            </button>
          ))}
        </div>

        {/* Products Table */}
        {activeTab === 'products' && (
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '20px', overflow: 'hidden'
          }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'rgba(59,130,246,0.08)' }}>
                    <th style={thStyle}>Product</th>
                    <th style={thStyle}>Category</th>
                    <th style={thStyle}>Price/mo</th>
                    <th style={thStyle}>Deposit</th>
                    <th style={thStyle}>Status</th>
                    <th style={thStyle}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <td style={{ ...tdStyle, color: '#fff', fontWeight: 600 }}>{product.name}</td>
                      <td style={tdStyle}>{product.category}</td>
                      <td style={{ ...tdStyle, color: '#60A5FA', fontWeight: 700 }}>₹{product.price}</td>
                      <td style={tdStyle}>₹{product.deposit}</td>
                      <td style={tdStyle}>
                        <span style={{
                          padding: '4px 12px', borderRadius: '20px',
                          fontSize: '12px', fontWeight: 600,
                          background: product.available ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
                          color: product.available ? '#34D399' : '#FCA5A5',
                          border: `1px solid ${product.available ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`
                        }}>
                          {product.available ? '✓ Available' : '✕ Unavailable'}
                        </span>
                      </td>
                      <td style={tdStyle}>
                        <button onClick={() => toggleAvailability(product.id)} style={{
                          background: 'rgba(59,130,246,0.15)',
                          border: '1px solid rgba(59,130,246,0.3)',
                          color: '#60A5FA', padding: '5px 14px',
                          borderRadius: '8px', fontSize: '12px',
                          fontWeight: 600, cursor: 'pointer'
                        }}>
                          Toggle
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders Table */}
        {activeTab === 'orders' && (
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '20px', overflow: 'hidden'
          }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'rgba(59,130,246,0.08)' }}>
                    <th style={thStyle}>User</th>
                    <th style={thStyle}>Product</th>
                    <th style={thStyle}>Tenure</th>
                    <th style={thStyle}>Total</th>
                    <th style={thStyle}>Date</th>
                    <th style={thStyle}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <td style={{ ...tdStyle, color: '#fff', fontWeight: 600 }}>{order.user}</td>
                      <td style={tdStyle}>{order.product}</td>
                      <td style={tdStyle}>{order.tenure} month(s)</td>
                      <td style={{ ...tdStyle, color: '#60A5FA', fontWeight: 700 }}>₹{order.total}</td>
                      <td style={tdStyle}>{order.date}</td>
                      <td style={tdStyle}>
                        <span style={{
                          padding: '4px 12px', borderRadius: '20px',
                          fontSize: '12px', fontWeight: 600,
                          background: order.status === 'Active' ? 'rgba(16,185,129,0.15)' : 'rgba(100,116,139,0.15)',
                          color: order.status === 'Active' ? '#34D399' : '#94A3B8',
                          border: `1px solid ${order.status === 'Active' ? 'rgba(16,185,129,0.3)' : 'rgba(100,116,139,0.3)'}`
                        }}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;