const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
    name: {
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

const Track = mongoose.model('Track', trackSchema);
module.exports.trackSchema = trackSchema;
module.exports.Track = Track;