import { BrowserRouter as Router, Routes, Route, Navigate, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './store/authSlice';
import Login from './pages/Login';
import Signup from './pages/Signup';
import JobsList from './pages/JobsList';
import AdminDashboard from './pages/AdminDashboard';
import AppliedJobs from './pages/AppliedJobs';
import { LayoutDashboard, Briefcase, LogOut, Bell } from 'lucide-react';
import InteractiveBg from './components/InteractiveBg';

function AdminShell({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="app-shell">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <h1>Admin Console</h1>
          <p>Talent Management</p>
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/admin" end className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <LayoutDashboard size={15} /> Dashboard
          </NavLink>
          <NavLink to="/admin/jobs" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Briefcase size={15} /> Manage Jobs
          </NavLink>
        </nav>
        <div className="sidebar-footer">
          <button className="nav-item" onClick={handleLogout}>
            <LogOut size={15} /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="main-content">
        <header className="page-header">
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', margin: 0 }}>Management Overview</h2>
            <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>Welcome back, {user?.email?.split('@')[0]}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}>
              <Bell size={18} />
            </button>
            <div style={{
              width: 34, height: 34, borderRadius: '50%',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: 700, fontSize: 13
            }}>
              {user?.email?.[0]?.toUpperCase()}
            </div>
          </div>
        </header>
        <main className="page-body">
          {children}
        </main>
      </div>
    </div>
  );
}

function SeekerShell({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => { dispatch(logout()); navigate('/login'); };

  return (
    <div style={{ minHeight: '100vh', background: '#f0f2f7', position: 'relative', overflow: 'hidden' }}>
      <InteractiveBg dark={false} />
      <header className="topbar">
        <span className="topbar-brand">Career<span>Arch</span></span>
        <nav className="topbar-nav" style={{ display: 'flex', gap: 4 }}>
          <NavLink to="/jobs" className={({ isActive }) => isActive ? 'active' : ''}>Find Jobs</NavLink>
          <NavLink to="/applied-jobs" className={({ isActive }) => isActive ? 'active' : ''}>My Applications</NavLink>
        </nav>
        <button className="btn btn-ghost" style={{ fontSize: 13 }} onClick={handleLogout}>
          <LogOut size={14} /> Sign Out
        </button>
      </header>
      <main style={{ padding: '32px', maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {children}
      </main>
    </div>
  );
}

function App() {
  const { user } = useSelector(state => state.auth);

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          user ? (user.role === 'admin' ? <Navigate to="/admin" /> : <Navigate to="/jobs" />) : <Navigate to="/login" />
        } />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />

        <Route path="/jobs" element={
          user && user.role === 'user' ? (
            <SeekerShell><JobsList /></SeekerShell>
          ) : <Navigate to="/" />
        } />
        <Route path="/applied-jobs" element={
          user && user.role === 'user' ? (
            <SeekerShell><AppliedJobs /></SeekerShell>
          ) : <Navigate to="/" />
        } />

        <Route path="/admin/*" element={
          user && user.role === 'admin' ? (
            <AdminShell><AdminDashboard /></AdminShell>
          ) : <Navigate to="/" />
        } />
      </Routes>
    </Router>
  );
}

export default App;
