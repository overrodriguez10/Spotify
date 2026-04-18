import React, { useRef, useEffect, useState } from 'react';
import { usePlayer } from '../context/Contexts';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

export default function Player() {
  const { currentSong, isPlaying, setIsPlaying } = usePlayer();
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log(e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      setProgress((current / duration) * 100);
    }
  };

  const handleProgressBarClick = (e) => {
    if (audioRef.current) {
      const width = e.currentTarget.clientWidth;
      const clickX = e.nativeEvent.offsetX;
      const duration = audioRef.current.duration;
      audioRef.current.currentTime = (clickX / width) * duration;
    }
  };

  if (!currentSong) return null;

  return (
    <div className="player">
      <div className="player-info">
        {currentSong.image_path && (
          <img src={`http://localhost:5000${currentSong.image_path}`} alt="cover" className="player-img" />
        )}
        <div>
          <div className="player-title">{currentSong.title}</div>
          <div style={{ fontSize: '12px', color: '#B3B3B3' }}>{currentSong.description}</div>
        </div>
      </div>
      
      <div className="player-controls">
        <div className="control-buttons">
          <button className="control-btn"><SkipBack size={20} /></button>
          <button className="control-btn play" onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? <Pause size={16} /> : <Play size={16} style={{ marginLeft: '2px' }} />}
          </button>
          <button className="control-btn"><SkipForward size={20} /></button>
        </div>
        <div className="progress-bar">
          <span>0:00</span>
          <div className="progress-container" onClick={handleProgressBarClick}>
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <span>3:00</span>
        </div>
      </div>

      <div style={{ width: '30%', display: 'flex', justifyContent: 'flex-end', color: '#B3B3B3' }}>
        <Volume2 size={20} />
      </div>

      <audio 
        ref={audioRef} 
        src={`http://localhost:5000${currentSong.file_path}`} 
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
}
