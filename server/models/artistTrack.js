const mongoose = require('mongoose');

const artistTrackSchema = new mongoose.Schema({
    name: String,
    artist: String,
    genre: String,
    duration: String
});

const ArtistTrack = mongoose.model('ArtistTrack', artistTrackSchema);
module.exports.artistTrackSchema = artistTrackSchema;
module.exports.ArtistTrack = ArtistTrack;