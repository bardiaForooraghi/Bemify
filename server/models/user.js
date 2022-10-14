const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

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
        maxlength: 100
    },
    email: {
        type: String,
        unique: true,
        match: /.*@.*/
    },
    profilePicture: {
        type: String,
        required: false
    },
    playlists: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Playlist"
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

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign( this.toJSON(), 'jwtPrivateKey');
    return token;
}

const User = mongoose.model('User', userSchema);

module.exports.User = User;