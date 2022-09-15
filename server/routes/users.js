const mongoose = require('mongoose');
const express = require('express');
const {User} = require('../models/user');

const router = express.Router();


router.post('/', async (req, res) => {
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
        user = await user.save();
        res.send(user);
    } catch (e) {
        res.status(400).send(e.message);
    }
});



module.exports = router;
