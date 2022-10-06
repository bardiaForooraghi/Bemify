const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
    name: String,
    genre: String,
    duration: String
});

const Track = mongoose.model('Track', trackSchema);
module.exports.trackSchema = trackSchema;
module.exports.Track = Track;