const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    name: String,
    tracks: {
        type: [trackSchema],
        default: []
    }
});

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports.Playlist = Playlist;