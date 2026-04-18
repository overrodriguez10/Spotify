import React, { useState } from 'react';
import { useAuth } from '../context/Contexts';

export default function Admin() {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [songFile, setSongFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  if (user?.role !== 'admin') {
    return <div>Acceso denegado.</div>;
  }

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
        alert('Song uploaded successfully!');
        setTitle('');
        setDescription('');
        setSongFile(null);
        setImageFile(null);
      } else {
        alert('Error uploading song');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="form-container">
      <h2>Upload New Song</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Description (Artist / Album)</label>
          <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Audio File (.mp3)</label>
          <input type="file" accept=".mp3,audio/*" onChange={e => setSongFile(e.target.files[0])} required />
        </div>
        <div className="form-group">
          <label>Cover Image (optional)</label>
          <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} />
        </div>
        <button type="submit" className="form-btn">Upload Song</button>
      </form>
    </div>
  );
}
