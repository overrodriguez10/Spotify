const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM('admin', 'user'), defaultValue: 'user' },
}, { timestamps: true });

const Song = sequelize.define('Song', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  file_path: { type: DataTypes.STRING, allowNull: false },
  image_path: { type: DataTypes.STRING },
}, { timestamps: true });

const Playlist = sequelize.define('Playlist', {
  name: { type: DataTypes.STRING, allowNull: false },
}, { timestamps: true });

const PlaylistSong = sequelize.define('PlaylistSong', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
}, { timestamps: false });

// Relaciones
User.hasMany(Playlist, { foreignKey: 'userId' });
Playlist.belongsTo(User, { foreignKey: 'userId' });

Playlist.belongsToMany(Song, { through: PlaylistSong, foreignKey: 'playlistId' });
Song.belongsToMany(Playlist, { through: PlaylistSong, foreignKey: 'songId' });

module.exports = { User, Song, Playlist, PlaylistSong, sequelize };
