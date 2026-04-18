import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/Contexts';
import { LogOut, User, PlusCircle } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/" style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>Spotify Clone</Link>
        <Link to="/">Home</Link>
        {user && <Link to="/playlists">Playlists</Link>}
        {user?.role === 'admin' && <Link to="/admin" style={{color: '#1DB954'}}><PlusCircle size={16} style={{marginRight: '4px', verticalAlign: 'text-bottom'}}/>Admin</Link>}
      </div>
      <div>
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ color: '#B3B3B3' }}><User size={16} /> {user.name}</span>
            <button onClick={logout} className="nav-btn" style={{ background: 'transparent', color: '#fff', border: '1px solid #fff' }}>
              <LogOut size={16} /> Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="nav-btn">Log in</Link>
        )}
      </div>
    </nav>
  );
}
