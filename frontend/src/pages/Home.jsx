import React, { useEffect, useState } from 'react';
import SongCard from '../components/SongCard';

export default function Home() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/songs')
      .then(res => res.json())
      .then(data => setSongs(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: '24px', fontSize: '24px', fontWeight: 'bold' }}>Todas las canciones</h2>
      <div className="song-grid">
        {songs.map(song => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
    </div>
  );
}
