const mongoose = require('mongoose');
const express = require('express');
const {User} = require('../models/user');
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

// Get the current user
router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

router.post('/', async (req, res) => {
    let user = await User.findOne({email: req.body.email});

    if (user) 
        return res.status(400).send('User already registered');

    try {
        let user = new User({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            profilePicture: req.body.profilePicture,
            playlist: req.body.Playlist,
            followers: req.body.followers,
            followings: req.body.followings
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        user = await user.save();
        const token = user.generateAuthToken();
        res.header('x-auth-token', token).status(200).send(user);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

module.exports = router;
