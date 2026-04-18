import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/Contexts';
import { PlusCircle, ListMusic } from 'lucide-react';

export default function Playlists() {
  const { user } = useAuth();
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const fetchPlaylists = () => {
    fetch('http://localhost:5000/api/playlists', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => setPlaylists(Array.isArray(data) ? data : []))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newPlaylistName.trim()) return;

    try {
      const res = await fetch('http://localhost:5000/api/playlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ name: newPlaylistName })
      });
      if (res.ok) {
        setNewPlaylistName('');
        setIsCreating(false);
        fetchPlaylists(); // Refresh list
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <ListMusic size={36} color="var(--primary-color)" /> Tus Listas de Reproducción
        </h1>
        <button 
          onClick={() => setIsCreating(!isCreating)} 
          className="btn-primary" 
          style={{ width: 'auto', padding: '12px 24px', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <PlusCircle size={20} /> Nueva Lista
        </button>
      </div>

      {isCreating && (
        <div className="glass-panel" style={{ padding: '24px', marginBottom: '32px', borderRadius: '12px', maxWidth: '500px' }}>
          <h3 style={{ marginBottom: '16px' }}>Nombre de tu nueva lista</h3>
          <form onSubmit={handleCreate} style={{ display: 'flex', gap: '12px' }}>
            <input 
              type="text" 
              placeholder="Ej: Para Estudiar 📚" 
              value={newPlaylistName}
              onChange={e => setNewPlaylistName(e.target.value)}
              style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: 'white' }}
              autoFocus
            />
            <button type="submit" className="btn-primary" style={{ margin: 0, width: 'auto' }}>
              Crear
            </button>
          </form>
        </div>
      )}

      {playlists.length > 0 ? (
        <div className="song-grid">
          {playlists.map(list => (
            <div key={list.id} className="song-card">
              <div style={{ width: '100%', aspectRatio: '1', background: 'var(--bg-highlight)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', marginBottom: '16px', boxShadow: '0 8px 16px rgba(0,0,0,0.4)' }}>
                <span style={{ fontSize: '64px' }}>🎧</span>
              </div>
              <div className="song-title">{list.name}</div>
              <div className="song-desc">{list.Songs?.length || 0} canciones</div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', color: 'var(--text-sub)', marginTop: '80px' }}>
          <ListMusic size={64} style={{ opacity: 0.2, marginBottom: '16px' }} />
          <h2>Aún no tienes listas.</h2>
          <p>¡Dale al botón "Nueva Lista" para crear una!</p>
        </div>
      )}
    </div>
  );
}
