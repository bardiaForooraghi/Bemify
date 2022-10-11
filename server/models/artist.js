const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const {Album, albumSchema} = require('../models/album');

const artistSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
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
    albums: {
        type: [albumSchema],
        default: []
    },
});

artistSchema.methods.generateAuthToken = function() {
    const token = jwt.sign( this.toJSON(), 'jwtPrivateKey');
    return token;
}

const Artist = mongoose.model('Artist', artistSchema);

module.exports.Artist = Artist;