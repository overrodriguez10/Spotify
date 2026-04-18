import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/Contexts';

export default function Profile() {
  const { user } = useAuth();
  const [playlists, setPlaylists] = useState([]);
  const [gradientColor, setGradientColor] = useState('');

  useEffect(() => {
    // Generar color al azar pero agradable a la vista
    const hue = Math.floor(Math.random() * 360);
    setGradientColor(`hsl(${hue}, 40%, 40%)`);

    // Fetch user playlists
    fetch('http://localhost:5000/api/playlists', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => setPlaylists(Array.isArray(data) ? data : []))
      .catch(err => console.error(err));
  }, []);

  if (!user) return null;

  return (
    <div className="profile-container">
      <div 
        className="profile-header" 
        style={{ 
          background: `linear-gradient(transparent 0, rgba(0,0,0,0.5) 100%), ${gradientColor}` 
        }}
      >
        <div className="profile-avatar">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div className="profile-info">
          <p className="profile-tag">Perfil</p>
          <h1 className="profile-name">{user.name}</h1>
          <p className="profile-stats">
            {playlists.length} listas de reproducción públicas
          </p>
        </div>
      </div>
      
      <div className="profile-content">
        <h2 style={{ marginBottom: '24px', fontSize: '24px', fontWeight: '800' }}>Listas de Reproducción</h2>
        {playlists.length > 0 ? (
          <div className="song-grid">
            {playlists.map(list => (
               <div key={list.id} className="song-card">
                  <div style={{ width: '100%', aspectRatio: '1', background: 'var(--bg-highlight)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', marginBottom: '16px' }}>
                    <span style={{ fontSize: '48px', color: 'var(--text-sub)' }}>🎵</span>
                  </div>
                  <div className="song-title">{list.name}</div>
               </div>
            ))}
          </div>
        ) : (
          <p style={{ color: 'var(--text-sub)' }}>Aún no has creado ninguna lista. Vuelve al inicio para comenzar.</p>
        )}
      </div>
    </div>
  );
}
