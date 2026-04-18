const { Playlist, PlaylistSong, Song } = require('../models');

exports.createPlaylist = async (req, res) => {
  try {
    const { name } = req.body;
    const playlist = await Playlist.create({ name, userId: req.user.id });
    res.status(201).json(playlist);
  } catch (error) {
    res.status(500).json({ error: 'Error creating playlist' });
  }
};

exports.getUserPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.findAll({
      where: { userId: req.user.id },
      include: [{ model: Song }]
    });
    res.json(playlists);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching playlists' });
  }
};

exports.addSongToPlaylist = async (req, res) => {
  try {
    const { playlistId, songId } = req.body;
    
    // Check if playlist belongs to the user
    const playlist = await Playlist.findOne({ where: { id: playlistId, userId: req.user.id } });
    if (!playlist) return res.status(404).json({ error: 'Playlist not found' });

    await PlaylistSong.create({ playlistId, songId });
    res.json({ message: 'Song added to playlist' });
  } catch (error) {
    res.status(500).json({ error: 'Error adding song to playlist' });
  }
};
