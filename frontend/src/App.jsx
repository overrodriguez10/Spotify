import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, PlayerProvider } from './context/Contexts';
import Navbar from './components/Navbar';
import Player from './components/Player';
import Home from './pages/Home';
import Login from './pages/Login';
import Admin from './pages/Admin';

function AppContent() {
  return (
    <div className="app-container">
      <div className="main-content">
        <div className="content-area">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            {/* Playlists page route placeholder */}
            <Route path="/playlists" element={<div style={{padding: '24px'}}><h2>Playlists functionality coming soon</h2></div>} />
          </Routes>
        </div>
      </div>
      <Player />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <PlayerProvider>
        <Router>
          <AppContent />
        </Router>
      </PlayerProvider>
    </AuthProvider>
  );
}
