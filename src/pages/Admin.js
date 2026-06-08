import React, { useState, useEffect } from 'react';

const API_URL = 'https://rentease-0pao.onrender.com';

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

const STATUS_OPTIONS = ['pending', 'confirmed', 'dispatched', 'delivered', 'cancelled'];

const statusStyle = {
  pending:    { bg: 'rgba(59,130,246,0.15)',  color: '#60A5FA'  },
  confirmed:  { bg: 'rgba(37,99,235,0.15)',   color: '#93C5FD'  },
  dispatched: { bg: 'rgba(16,185,129,0.15)',  color: '#34D399'  },
  delivered:  { bg: 'rgba(5,150,105,0.15)',   color: '#6EE7B7'  },
  cancelled:  { bg: 'rgba(239,68,68,0.15)',   color: '#FCA5A5'  },
};

function Admin() {
  const [products, setProducts] = useState(initialProducts);
  const [activeTab, setActiveTab] = useState("products");
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userOrders, setUserOrders] = useState([]);
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    fetchAllOrders();
    fetchAllUsers();
  }, []);

  const fetchAllOrders = async () => {
    try {
      const token = localStorage.getItem('rentease_token');
      const res = await fetch(`${API_URL}/api/orders/all`, {
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

  const fetchAllUsers = async () => {
    try {
      const token = localStorage.getItem('rentease_token');
      const res = await fetch(`${API_URL}/api/users/all`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setUsers(data.users);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUserOrders = async (userId) => {
    setModalLoading(true);
    try {
      const token = localStorage.getItem('rentease_token');
      const res = await fetch(`${API_URL}/api/users/${userId}/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setUserOrders(data.orders);
    } catch (err) {
      console.error(err);
    } finally {
      setModalLoading(false);
    }
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setUserOrders([]);
    fetchUserOrders(user._id);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setUserOrders([]);
  };

  const updateStatus = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      const token = localStorage.getItem('rentease_token');
      const res = await fetch(`${API_URL}/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setOrders(orders.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  const toggleAvailability = (id) => {
    setProducts(products.map(p => p.id === id ? { ...p, available: !p.available } : p));
  };

  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  const stats = [
    { icon: '📦', label: 'Total Products', value: initialProducts.length, accent: '#3B82F6' },
    { icon: '🧾', label: 'Total Orders',   value: orders.length,          accent: '#10B981' },
    { icon: '👥', label: 'Total Users',    value: users.length,           accent: '#8B5CF6' },
    { icon: '💰', label: 'Total Revenue',  value: `₹${totalRevenue.toLocaleString()}`, accent: '#F59E0B' },
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
          {['products', 'orders', 'users'].map(tab => (
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
              {tab === 'products' ? '📦 Products' : tab === 'orders' ? '🧾 Orders' : '👥 Users'}
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
            {loading ? (
              <div style={{ padding: '60px', textAlign: 'center' }}>
                <div style={{ fontSize: '36px', marginBottom: '14px' }}>⏳</div>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>Loading orders...</p>
              </div>
            ) : orders.length === 0 ? (
              <div style={{ padding: '60px', textAlign: 'center' }}>
                <div style={{ fontSize: '36px', marginBottom: '14px' }}>📭</div>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>Kahi orders nahi abhi tak</p>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: 'rgba(59,130,246,0.08)' }}>
                      <th style={thStyle}>Order ID</th>
                      <th style={thStyle}>Customer</th>
                      <th style={thStyle}>Items</th>
                      <th style={thStyle}>Total</th>
                      <th style={thStyle}>Date</th>
                      <th style={thStyle}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => {
                      const s = statusStyle[order.status] || statusStyle.pending;
                      return (
                        <tr key={order._id}
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >
                          <td style={{ ...tdStyle, color: '#fff', fontWeight: 700, fontSize: '13px' }}>
                            #{order._id.slice(-6).toUpperCase()}
                          </td>
                          <td style={tdStyle}>
                            <div style={{ color: '#fff', fontWeight: 600 }}>{order.user?.name || 'N/A'}</div>
                            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)' }}>{order.user?.email}</div>
                          </td>
                          <td style={{ ...tdStyle, maxWidth: '180px' }}>
                            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px' }}>
                              {order.items?.map(i => i.name).join(', ')}
                            </div>
                          </td>
                          <td style={{ ...tdStyle, color: '#60A5FA', fontWeight: 700 }}>
                            ₹{order.totalAmount?.toLocaleString()}
                          </td>
                          <td style={{ ...tdStyle, fontSize: '13px' }}>
                            {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </td>
                          <td style={tdStyle}>
                            <select
                              value={order.status}
                              disabled={updatingId === order._id}
                              onChange={(e) => updateStatus(order._id, e.target.value)}
                              style={{
                                background: s.bg,
                                color: s.color,
                                border: `1px solid ${s.color}50`,
                                borderRadius: '8px',
                                padding: '5px 10px',
                                fontSize: '12px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                outline: 'none'
                              }}
                            >
                              {STATUS_OPTIONS.map(opt => (
                                <option key={opt} value={opt} style={{ background: '#0F172A', color: '#fff' }}>
                                  {opt.charAt(0).toUpperCase() + opt.slice(1)}
                                </option>
                              ))}
                            </select>
                            {updatingId === order._id && (
                              <span style={{ fontSize: '11px', color: '#60A5FA', marginLeft: '8px' }}>saving...</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Users Table */}
        {activeTab === 'users' && (
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '20px', overflow: 'hidden'
          }}>
            {users.length === 0 ? (
              <div style={{ padding: '60px', textAlign: 'center' }}>
                <div style={{ fontSize: '36px', marginBottom: '14px' }}>👥</div>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>Kahi users nahi abhi tak</p>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: 'rgba(59,130,246,0.08)' }}>
                      <th style={thStyle}>User</th>
                      <th style={thStyle}>Phone</th>
                      <th style={thStyle}>Joined</th>
                      <th style={thStyle}>Orders</th>
                      <th style={thStyle}>Total Spent</th>
                      <th style={thStyle}>Activity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user._id}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >
                        <td style={tdStyle}>
                          <div style={{ color: '#fff', fontWeight: 600 }}>{user.name}</div>
                          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)' }}>{user.email}</div>
                        </td>
                        <td style={tdStyle}>{user.phone}</td>
                        <td style={tdStyle}>
                          {new Date(user.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </td>
                        <td style={tdStyle}>
                          <span style={{
                            background: 'rgba(59,130,246,0.15)', color: '#60A5FA',
                            padding: '3px 10px', borderRadius: '20px',
                            fontSize: '12px', fontWeight: 700
                          }}>
                            {user.orderCount}
                          </span>
                        </td>
                        <td style={{ ...tdStyle, color: '#34D399', fontWeight: 700 }}>
                          ₹{user.totalSpent.toLocaleString()}
                        </td>
                        <td style={tdStyle}>
                          <button onClick={() => openModal(user)} style={{
                            background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
                            border: 'none', color: '#fff',
                            padding: '6px 16px', borderRadius: '8px',
                            fontSize: '12px', fontWeight: 600,
                            cursor: 'pointer'
                          }}>
                            View Activity
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </div>

      {/* User Activity Modal */}
      {selectedUser && (
        <div onClick={closeModal} style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(6px)',
          zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '20px'
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: 'linear-gradient(135deg, #0F172A, #1E293B)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '24px',
            width: '100%', maxWidth: '620px',
            maxHeight: '85vh', overflowY: 'auto',
            padding: '32px'
          }}>
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
              <div>
                <h2 style={{ color: '#fff', fontSize: '20px', fontWeight: 800, marginBottom: '4px' }}>
                  👤 {selectedUser.name}
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>{selectedUser.email}</p>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>{selectedUser.phone}</p>
              </div>
              <button onClick={closeModal} style={{
                background: 'rgba(255,255,255,0.08)',
                border: 'none', color: '#fff',
                width: '36px', height: '36px',
                borderRadius: '10px', fontSize: '18px',
                cursor: 'pointer', display: 'flex',
                alignItems: 'center', justifyContent: 'center'
              }}>✕</button>
            </div>

            {/* User Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '24px' }}>
              {[
                { label: 'Joined', value: new Date(selectedUser.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) },
                { label: 'Total Orders', value: selectedUser.orderCount },
                { label: 'Total Spent', value: `₹${selectedUser.totalSpent.toLocaleString()}` },
              ].map(stat => (
                <div key={stat.label} style={{
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '12px', padding: '14px',
                  textAlign: 'center'
                }}>
                  <div style={{ color: '#fff', fontWeight: 700, fontSize: '16px' }}>{stat.value}</div>
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', marginTop: '4px' }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Orders List */}
            <h3 style={{ color: '#fff', fontSize: '15px', fontWeight: 700, marginBottom: '14px' }}>
              🧾 Order History
            </h3>

            {modalLoading ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <div style={{ fontSize: '28px', marginBottom: '10px' }}>⏳</div>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>Loading orders...</p>
              </div>
            ) : userOrders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <div style={{ fontSize: '28px', marginBottom: '10px' }}>📭</div>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>Kahi orders nahi yet</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {userOrders.map(order => {
                  const s = statusStyle[order.status] || statusStyle.pending;
                  return (
                    <div key={order._id} style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: '14px', padding: '16px'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <span style={{ color: '#fff', fontWeight: 700, fontSize: '13px' }}>
                          #{order._id.slice(-6).toUpperCase()}
                        </span>
                        <span style={{
                          background: s.bg, color: s.color,
                          padding: '3px 10px', borderRadius: '20px',
                          fontSize: '11px', fontWeight: 700
                        }}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                      <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', marginBottom: '8px' }}>
                        {order.items?.map(i => i.name).join(', ')}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#60A5FA', fontWeight: 700, fontSize: '14px' }}>
                          ₹{order.totalAmount?.toLocaleString()}
                        </span>
                        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>
                          {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;