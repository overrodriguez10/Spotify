import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/Contexts';
import { LogOut, User, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (location.pathname === '/login' || location.pathname === '/adminlogin') {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/" style={{ fontSize: '24px', fontWeight: '800', color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{width: 32, height: 32, background: 'var(--primary-color)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{width: 12, height: 12, background: 'black', borderRadius: '50%'}}></div>
          </div>
          Spoty Music
        </Link>
        <Link to="/">Descubrir</Link>
        {user && <Link to="/playlists">Tus Listas</Link>}
      </div>
      <div>
        {user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            {user.role === 'admin' && (
              <Link to="/admin" style={{ color: 'var(--primary-color)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <LayoutDashboard size={18} /> Panel Admin
              </Link>
            )}
            <Link to="/profile" style={{ color: 'var(--text-main)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s', padding: '6px 12px', borderRadius: '24px', background: 'rgba(255,255,255,0.05)' }}>
              <div style={{background: 'rgba(255,255,255,0.1)', padding: '6px', borderRadius: '50%'}}>
                <User size={16} />
              </div>
              {user.name}
            </Link>
            <button onClick={logout} className="nav-btn" style={{ background: 'transparent', color: 'var(--text-sub)', border: '1px solid var(--text-sub)', padding: '8px 20px' }}>
              <LogOut size={16} style={{ marginRight: '6px', verticalAlign: 'text-bottom' }} /> Salir
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
