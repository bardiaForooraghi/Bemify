const mongoose = require('mongoose');
const express = require('express');
const {User} = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

// Get the current user
router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');

    if(!user){
        return res.status(404).send('User not found!')
    }
    
    res.send(user);
});

router.post('/', async (req, res) => {
    let user = await User.findOne({email: req.body.email});
    let inputUsername = req.body.username

    if (user) {
        return res.status(400).send('User already registered');
    } else if (inputUsername.includes("artist")) {
        return res.status(400).send('The keyword artist can only be used by verified artists!')
    }

    try {
        let user = new User({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            profilePicture: '../../public/profile-pic.png',
            playlist: req.body.Playlist,
            followers: req.body.followers,
            followings: req.body.followings
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        user = await user.save();
        const token = await user.generateAuthToken();
        res.status(201).json({token, user});
    } catch (e) {
        res.status(400).send(e.message);
    }
});

module.exports = router;
