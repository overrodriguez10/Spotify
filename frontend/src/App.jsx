import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, PlayerProvider, useAuth } from './context/Contexts';
import Navbar from './components/Navbar';
import Player from './components/Player';
import Home from './pages/Home';
import LoginUser from './pages/LoginUser';
import LoginAdmin from './pages/LoginAdmin';
import Admin from './pages/Admin';
import Profile from './pages/Profile';
import Playlists from './pages/Playlists';

// Guard for authenticated users
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function AppContent() {
  const { user } = useAuth();

  return (
    <div className="app-container">
      <div className="main-content">
        <div className="content-area">
          <Navbar />
          <Routes>
            <Route path="/login" element={<LoginUser />} />
            <Route path="/adminlogin" element={<LoginAdmin />} />
            
            {/* Protected Routes */}
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/playlists" 
              element={
                <ProtectedRoute>
                  <Playlists />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </div>
      {user && <Player />}
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
