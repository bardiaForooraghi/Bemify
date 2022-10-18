const mongoose = require('mongoose');

const artistTrackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    }
});

const ArtistTrack = mongoose.model('ArtistTrack', artistTrackSchema);
module.exports.artistTrackSchema = artistTrackSchema;
module.exports.ArtistTrack = ArtistTrack;