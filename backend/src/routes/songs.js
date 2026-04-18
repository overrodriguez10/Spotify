const express = require('express');
const router = express.Router();
const songsController = require('../controllers/songs');
const { authenticateToken, isAdmin } = require('../middlewares/auth');
const upload = require('../middlewares/upload');

// Public route to get all songs
router.get('/', songsController.getAllSongs);

// Admin-only routes
router.post(
  '/',
  authenticateToken,
  isAdmin,
  upload.fields([{ name: 'song', maxCount: 1 }, { name: 'image', maxCount: 1 }]),
  songsController.createSong
);
router.delete('/:id', authenticateToken, isAdmin, songsController.deleteSong);

module.exports = router;
