const mongoose = require('mongoose');

const {Track, trackSchema} = require('../models/track');

const playlistSchema = new mongoose.Schema({
    name: String,
    tracks: {
        type: [trackSchema],
        default: []
    }
});

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports.playlistSchema = playlistSchema;
module.exports.Playlist = Playlist;