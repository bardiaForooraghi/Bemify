const mongoose = require('mongoose');
const express = require('express');
const {Artist} = require('../models/artist');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

// Get the current artist
router.get('/artist', auth, async (req, res) => {
    const artist = await Artist.findById(req.artist_id).select('-password');
    res.send(artist);
});

router.post('/artist', async (req, res) => {
    let artist = await Artist.findOne({email: req.body.email});
    let inputUsername = req.body.username

    if (artist) {
        return res.status(400).send('Artist already registered');
    }
    
    if (inputUsername.includes("artist")) {
        try {
            let artist = new Artist({
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                albums: req.body.album,
            });
            const salt = await bcrypt.genSalt(10);
            artist.password = await bcrypt.hash(artist.password, salt);
            artist = await artist.save();
            const token = artist.generateAuthToken();
            // res.header('x-auth-token', token).status(200).send(artist);
            res.json({token, artist});
        } catch (e) {
            res.status(400).send(e.message);
        }
    } else {
        return res.status(400).send('Artists must contain "artist" in their username')
    }
});

module.exports = router;
