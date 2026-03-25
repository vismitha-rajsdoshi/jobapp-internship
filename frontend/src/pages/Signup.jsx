import React, { useState, useEffect } from 'react';
import InteractiveBg from '../components/InteractiveBg';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signupUser, clearError } from '../store/authSlice';
import { Briefcase, ArrowRight, Eye, EyeOff, ShieldCheck, User } from 'lucide-react';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, error } = useSelector(state => state.auth);

  useEffect(() => { dispatch(clearError()); }, [dispatch]);
  useEffect(() => {
    if (user) navigate(user.role === 'admin' ? '/admin' : '/jobs');
  }, [user, navigate]);

  const isAdmin = email.endsWith('@arnifi.com');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signupUser({ email, password }));
  };

  return (
    <div className="auth-wrapper" style={{ position: 'relative', overflow: 'hidden' }}>
      <InteractiveBg dark={true} />
      <div style={{ width: '100%', maxWidth: 420, position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16, margin: '0 auto 12px',
            background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Briefcase size={26} color="#fff" />
          </div>
          <h1 style={{ color: '#fff', fontSize: 20, fontWeight: 800, margin: 0 }}>CareerArch</h1>
          <p style={{ color: '#94a3b8', fontSize: 13, margin: '4px 0 0' }}>Your career, architected.</p>
        </div>

        <div className="auth-card">
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#111827', margin: '0 0 4px' }}>
            Create your account
          </h2>
          <p style={{ fontSize: 13, color: '#9ca3af', margin: '0 0 28px' }}>
            Join thousands finding their next opportunity.
          </p>

          {error && (
            <div style={{
              background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 8,
              padding: '10px 14px', marginBottom: 20, color: '#dc2626', fontSize: 13, fontWeight: 500
            }}>
              {error}
            </div>
          )}

          {/* Role preview pill */}
          {email && (
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '6px 14px', borderRadius: 100, marginBottom: 20, fontSize: 12, fontWeight: 600,
              background: isAdmin ? '#eff6ff' : '#f0fdf4',
              color: isAdmin ? '#1d4ed8' : '#15803d',
              border: `1px solid ${isAdmin ? '#bfdbfe' : '#86efac'}`
            }}>
              {isAdmin ? <ShieldCheck size={13} /> : <User size={13} />}
              {isAdmin ? 'Admin Account (arnifi.com)' : 'Job Seeker Account'}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label className="form-label">Email address</label>
              <input className="form-input" type="email" required autoFocus
                placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <input className="form-input" type={showPass ? 'text' : 'password'} required minLength={6}
                  placeholder="At least 6 characters" value={password} onChange={e => setPassword(e.target.value)}
                  style={{ paddingRight: 40 }} />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{
                  position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: 0
                }}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button type="submit" className="btn btn-primary" disabled={isLoading}
              style={{ width: '100%', justifyContent: 'center', height: 44, marginTop: 4, fontSize: 14, opacity: isLoading ? 0.7 : 1 }}>
              {isLoading ? 'Creating account…' : <><span>Create Account</span><ArrowRight size={15} /></>}
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: 13, color: '#6b7280', marginTop: 24, marginBottom: 0 }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}>
              Sign in →
            </Link>
          </p>
        </div>

        <p style={{ textAlign: 'center', fontSize: 11, color: '#475569', marginTop: 20 }}>
          Emails ending in <strong style={{ color: '#e2e8f0' }}>@arnifi.com</strong> get Admin access.
        </p>
      </div>
    </div>
  );
}
