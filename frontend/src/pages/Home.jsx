import React, { useEffect, useState } from 'react';
import SongCard from '../components/SongCard';
import { useAuth } from '../context/Contexts';

export default function Home() {
  const [songs, setSongs] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    fetch(`${apiUrl}/api/songs`)
      .then(res => res.json())
      .then(data => setSongs(data))
      .catch(err => console.error(err));
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 19) return 'Buenas tardes';
    return 'Buenas noches';
  };

  return (
    <div className="home-container">
      <div className="hero-banner">
        <h1 className="hero-title">{getGreeting()}, {user?.name.split(' ')[0] || 'Explorador'}</h1>
        <p style={{ color: 'var(--text-sub)', fontSize: '18px' }}>Tu música lista para sonar.</p>
      </div>
      
      <h2 style={{ marginBottom: '24px', fontSize: '24px', fontWeight: '800' }}>Añadido Recientemente</h2>
      <div className="song-grid">
        {songs.length > 0 ? (
          songs.map(song => (
            <SongCard key={song.id} song={song} />
          ))
        ) : (
          <p style={{ color: 'var(--text-sub)' }}>No hay canciones disponibles aún. Pídele al administrador que suba algunas.</p>
        )}
      </div>
    </div>
  );
}
