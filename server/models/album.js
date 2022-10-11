const mongoose = require('mongoose');

const {Track, trackSchema} = require('../models/track');

const albumSchema = new mongoose.Schema({
    name: String,
    artist: String,
    tracks: {
        type: [trackSchema],
        default: []
    }
});

const Album = mongoose.model('Album', albumSchema);

module.exports.albumSchema = albumSchema;
module.exports.Album = Album;