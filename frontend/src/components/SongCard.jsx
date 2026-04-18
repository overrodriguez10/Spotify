import React, { useState } from 'react';
import { usePlayer } from '../context/Contexts';
import { Play, Pause, Plus } from 'lucide-react';

export default function SongCard({ song }) {
  const { currentSong, isPlaying, playSong } = usePlayer();
  const [showPlaylists, setShowPlaylists] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  
  const isThisPlaying = isPlaying && currentSong?.id === song.id;

  const handleAddClick = async (e) => {
    e.stopPropagation();
    try {
      const res = await fetch('http://localhost:5000/api/playlists', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await res.json();
      setPlaylists(Array.isArray(data) ? data : []);
      setShowPlaylists(true);
    } catch (err) {
      console.error(err);
    }
  };

  const addSongToPlaylist = async (playlistId) => {
    try {
      const res = await fetch('http://localhost:5000/api/playlists/add-song', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ playlistId, songId: song.id })
      });
      if (res.ok) {
        alert('Canción añadida a la lista.');
        setShowPlaylists(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="song-card" style={{ position: 'relative' }}>
      <img 
        src={song.image_path ? `http://localhost:5000${song.image_path}` : 'https://via.placeholder.com/150'} 
        alt={song.title} 
        className="song-image" 
      />
      
      <button className="play-btn" onClick={() => playSong(song)}>
        {isThisPlaying ? <Pause fill="black" /> : <Play fill="black" style={{ marginLeft: '4px' }} />}
      </button>

      <button onClick={handleAddClick} style={{ position: 'absolute', top: '24px', right: '24px', background: 'rgba(0,0,0,0.6)', border: 'none', color: 'white', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
        <Plus size={16} />
      </button>

      <div className="song-title">{song.title}</div>
      <div className="song-desc">{song.description}</div>

      {showPlaylists && (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.9)', zIndex: 10, borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column' }}>
          <h4 style={{ marginBottom: '12px', fontSize: '14px', borderBottom: '1px solid #333', paddingBottom: '8px' }}>Añadir a lista:</h4>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {playlists.length > 0 ? playlists.map(pl => (
              <div 
                key={pl.id} 
                onClick={() => addSongToPlaylist(pl.id)}
                style={{ padding: '8px', cursor: 'pointer', fontSize: '14px', borderRadius: '4px' }}
                onMouseEnter={e => e.currentTarget.style.background = '#333'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                {pl.name}
              </div>
            )) : <div style={{ fontSize: '12px', color: '#888' }}>No hay listas creadas.</div>}
          </div>
          <button onClick={() => setShowPlaylists(false)} style={{ marginTop: 'auto', background: 'transparent', color: 'white', border: '1px solid white', borderRadius: '16px', padding: '4px' }}>Cancelar</button>
        </div>
      )}
    </div>
  );
}
