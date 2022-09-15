const mongoose = require('mongoose');

const {Playlist, playlistSchema} = require('../models/playlist');
const {Track, trackSchema} = require('../models/track');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 15
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 10
    },
    email: {
        type: String,
        match: /.*@.*/
    },
    profilePicture: String,
    playlists: {
        type: [playlistSchema],
        default: []
    },
    followers: {
        type: [mongoose.SchemaTypes.ObjectId],
        default: []
    },
    followings: {
        type: [mongoose.SchemaTypes.ObjectId],
        default: []
    },
});

const User = mongoose.model('User', userSchema);

module.exports.User = User;