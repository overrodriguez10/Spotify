import React, { useState } from 'react';
import { useAuth } from '../context/Contexts';
import { UploadCloud, Music, Image as ImageIcon, Type, FileAudio } from 'lucide-react';

export default function Admin() {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [songFile, setSongFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!songFile) return alert('File missing');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('song', songFile);
    if (imageFile) formData.append('image', imageFile);

    try {
      const res = await fetch('http://localhost:5000/api/songs', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });
      if (res.ok) {
        alert('Canción subida correctamente a la base de datos.');
        setTitle('');
        setDescription('');
        setSongFile(null);
        setImageFile(null);
      } else {
        alert('Error subiendo la canción.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '32px' }}>
      <div style={{ background: 'rgba(29, 185, 84, 0.1)', border: '1px solid var(--primary-color)', borderRadius: '12px', padding: '32px', marginBottom: '32px' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--primary-color)' }}>
          <UploadCloud size={32} /> Panel de Administración Musical
        </h1>
        <p style={{ color: 'var(--text-sub)', marginTop: '8px', fontSize: '16px' }}>
          Desde aquí puedes alimentar la base de datos subiendo archivos de alto nivel. Completa la metadata requerida.
        </p>
      </div>

      <div className="login-box glass-panel" style={{ margin: '0 auto', maxWidth: '600px', width: '100%' }}>
        <h2 style={{ marginBottom: '24px', fontWeight: '700' }}>Nueva Pista</h2>
        <form onSubmit={handleSubmit} className="premium-form">
          <div className="form-group">
            <div className="admin-row">
              <Type size={18} color="var(--primary-color)"/> <label>Título de la Canción</label>
            </div>
            <input type="text" placeholder="Ej. Bohemian Rhapsody" value={title} onChange={e => setTitle(e.target.value)} required />
          </div>

          <div className="form-group">
            <div className="admin-row">
              <Music size={18} color="var(--primary-color)"/> <label>Artista / Álbum</label>
            </div>
            <input type="text" placeholder="Ej. Queen - A Night At The Opera" value={description} onChange={e => setDescription(e.target.value)} />
          </div>

          <div className="form-group" style={{ marginTop: '32px' }}>
            <div className="admin-row" style={{ marginBottom: '16px' }}>
              <FileAudio size={18} color="var(--primary-color)"/> <label>Archivo de Audio (.mp3)</label>
            </div>
            <div className="file-upload-box">
              <input type="file" accept=".mp3,audio/*" onChange={e => setSongFile(e.target.files[0])} required />
              {songFile && <div style={{marginTop: '12px', color: 'var(--primary-color)'}}>Archivo cargado: {songFile.name}</div>}
            </div>
          </div>

          <div className="form-group">
            <div className="admin-row" style={{ marginBottom: '16px' }}>
              <ImageIcon size={18} color="var(--primary-color)"/> <label>Carátula (Opcional)</label>
            </div>
            <div className="file-upload-box">
              <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} />
              {imageFile && <div style={{marginTop: '12px', color: 'var(--primary-color)'}}>Imagen cargada: {imageFile.name}</div>}
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: '24px', padding: '16px', fontSize: '18px' }}>
            Publicar Canción
          </button>
        </form>
      </div>
    </div>
  );
}
