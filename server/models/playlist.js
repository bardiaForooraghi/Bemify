const mongoose = require('mongoose');

const {Track, trackSchema} = require('../models/track');
const {ArtistTrack, artistTrackSchema} = require('../models/artistTrack')

const playlistSchema = new mongoose.Schema({
    name: String,
    owner: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "User"
    },
    tracks: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Track"
    },
    artisttracks: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "ArtistTrack"
    }
});

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports.playlistSchema = playlistSchema;
module.exports.Playlist = Playlist;