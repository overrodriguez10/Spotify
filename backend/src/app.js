const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth');
const songsRoutes = require('./routes/songs');
const playlistsRoutes = require('./routes/playlists');

const app = express();

app.get('/', (req, res) => {
  res.send('El backend del Spotify Clone está funcionando correctamente 🚀');
});

app.get('/setup-admin', async (req, res) => {
  const syncDb = require('./src/sync');
  await syncDb();
  res.send('Admin sincronizado correctamente ✅');
});

app.use(cors({
  origin: '*' 
}));
app.use(express.json());

// Serve static files (uploads)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/songs', songsRoutes);
app.use('/api/playlists', playlistsRoutes);

module.exports = app;
