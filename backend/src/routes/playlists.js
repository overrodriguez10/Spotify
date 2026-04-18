const express = require('express');
const router = express.Router();
const playlistsController = require('../controllers/playlists');
const { authenticateToken } = require('../middlewares/auth');

router.use(authenticateToken);

router.post('/', playlistsController.createPlaylist);
router.get('/', playlistsController.getUserPlaylists);
router.post('/add-song', playlistsController.addSongToPlaylist);

module.exports = router;
