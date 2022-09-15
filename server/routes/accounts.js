const mongoose = require('mongoose');

const express = require('express');
const {User} = require('../models/user');
const {Playlist} = require('../models/playlist');
const {Track} = require('../models/track');

const router = express.Router();

// create a playlist for a user (post a collection/single item)
router.post('/:account_id/newPlaylist', async (req, res) => {
    const user = await User.findById(req.params.account_id);

    if (!user) 
        res.status(404).message('User Not Found!');

    try {
        let playlist = new Playlist({
            name: req.body.name,
            tracks: req.body.tracks
        });

        user.playlists.push(playlist);
        const result = await user.save();

        res.send(result);
    } catch (e) {
        res.status(400).send(e.message);
    }
});


// get a specific user (single item)
router.get('/:account_id', async (req, res) => {
    const user = await User.findById(req.params.account_id);

    if (!user) 
        res.status(404).message('User Not Found!');

    try {
        res.send(user);

    } catch (e) {
        res.status(400).send(e.message);
    }    
});

// delete a specific playlist for a user
router.delete('/:account_id/playlists/:playlist_id', async (req, res) => {
    const user = await User.findById(req.params.account_id);

    if (!user) 
        res.status(404).message('User Not Found!');

    try {
        const result = await user.update({$pull: {playlists: {_id: req.params.playlist_id}}}, {new: true});
        const result2 = await user.save();
        res.send(result2);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

module.exports = router;