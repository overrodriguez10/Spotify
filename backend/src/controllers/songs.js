const { Song } = require('../models');

exports.createSong = async (req, res) => {
  try {
    const { title, description } = req.body;
    
    // Check files
    const songFile = req.files && req.files.song ? req.files.song[0] : null;
    const imageFile = req.files && req.files.image ? req.files.image[0] : null;

    if (!songFile) {
      return res.status(400).json({ error: 'Song audio file is required' });
    }

    const newSong = await Song.create({
      title,
      description,
      file_path: '/uploads/songs/' + songFile.filename,
      image_path: imageFile ? '/uploads/images/' + imageFile.filename : null,
    });

    res.status(201).json(newSong);
  } catch (error) {
    res.status(500).json({ error: 'Error creating song' });
  }
};

exports.getAllSongs = async (req, res) => {
  try {
    const songs = await Song.findAll();
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching songs' });
  }
};

exports.deleteSong = async (req, res) => {
  try {
    const { id } = req.params;
    const song = await Song.findByPk(id);
    if (!song) {
      return res.status(404).json({ error: 'Song not found' });
    }
    await song.destroy();
    res.json({ message: 'Song deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting song' });
  }
};
