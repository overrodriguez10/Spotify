import React from 'react';
import { usePlayer } from '../context/Contexts';
import { Play, Pause } from 'lucide-react';

export default function SongCard({ song }) {
  const { currentSong, isPlaying, playSong } = usePlayer();
  
  const isThisPlaying = isPlaying && currentSong?.id === song.id;

  return (
    <div className="song-card">
      <img 
        src={song.image_path ? `http://localhost:5000${song.image_path}` : 'https://via.placeholder.com/150'} 
        alt={song.title} 
        className="song-image" 
      />
      <button className="play-btn" onClick={() => playSong(song)}>
        {isThisPlaying ? <Pause fill="black" /> : <Play fill="black" style={{ marginLeft: '4px' }} />}
      </button>
      <div className="song-title">{song.title}</div>
      <div className="song-desc">{song.description}</div>
    </div>
  );
}
