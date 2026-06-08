import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email || !password) {
      setError('Please fill all fields!');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('https://rentease-0pao.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('rentease_token', data.token);
        localStorage.setItem('rentease_user', JSON.stringify(data.user));
        navigate('/');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Something went wrong!');
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0A0F1E 0%, #0F172A 50%, #1E293B 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px'
    }}>
      {/* Background decoration */}
      <div style={{
        position: 'fixed', top: '-100px', right: '-100px',
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none'
      }} />
      <div style={{
        position: 'fixed', bottom: '-100px', left: '-100px',
        width: '350px', height: '350px',
        background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none'
      }} />

      <div style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '24px',
        backdropFilter: 'blur(20px)',
        padding: '48px 40px',
        width: '100%', maxWidth: '420px',
        position: 'relative',
        boxShadow: '0 24px 64px rgba(0,0,0,0.4)'
      }}>

        {/* Top accent line */}
        <div style={{
          position: 'absolute', top: 0, left: '10%', right: '10%', height: '2px',
          background: 'linear-gradient(90deg, transparent, #3B82F6, transparent)',
          borderRadius: '2px'
        }} />

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '52px', height: '52px',
            background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
            borderRadius: '14px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 800, color: '#fff', fontSize: '18px',
            margin: '0 auto 16px',
            boxShadow: '0 8px 24px rgba(59,130,246,0.4)'
          }}>RE</div>
          <h2 style={{
            fontSize: '24px', fontWeight: 800, color: '#fff',
            marginBottom: '6px', letterSpacing: '-0.5px'
          }}>Welcome Back!</h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>
            Login to your RentEase account
          </p>
        </div>

        {error && (
          <div style={{
            background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)',
            borderRadius: '10px', padding: '12px 16px', marginBottom: '20px',
            color: '#FCA5A5', fontSize: '14px', textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {[
            { label: 'Email', type: 'email', placeholder: 'Enter your email', value: email, setter: setEmail },
            { label: 'Password', type: 'password', placeholder: 'Enter your password', value: password, setter: setPassword },
          ].map(field => (
            <div key={field.label}>
              <label style={{
                display: 'block', fontWeight: 600, fontSize: '13px',
                color: 'rgba(255,255,255,0.7)', marginBottom: '8px', letterSpacing: '0.3px'
              }}>{field.label}</label>
              <input
                type={field.type}
                placeholder={field.placeholder}
                value={field.value}
                onChange={(e) => field.setter(e.target.value)}
                style={{
                  width: '100%', boxSizing: 'border-box',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1.5px solid rgba(255,255,255,0.1)',
                  borderRadius: '10px', padding: '12px 16px',
                  fontSize: '14px', outline: 'none',
                  color: '#fff', transition: 'border-color 0.2s'
                }}
                onFocus={e => e.target.style.borderColor = '#3B82F6'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>
          ))}

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              background: loading ? 'rgba(59,130,246,0.4)' : 'linear-gradient(135deg, #3B82F6, #2563EB)',
              color: '#fff', padding: '14px',
              borderRadius: '10px', border: 'none',
              fontWeight: 700, fontSize: '15px',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: loading ? 'none' : '0 4px 20px rgba(59,130,246,0.4)',
              transition: 'all 0.2s', marginTop: '4px'
            }}
          >
            {loading ? 'Logging in...' : 'Login →'}
          </button>
        </div>

        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '14px', marginTop: '24px' }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ color: '#60A5FA', fontWeight: 600, textDecoration: 'none' }}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;