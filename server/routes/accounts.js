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

// get a specific playlist for the user (get a collection)
router.get('/:account_id/playlists/:playlist_id', async (req, res) => {
    const userId = req.params.account_id;
    const playlistId = req.params.playlist_id;

    try {
        const user = await User.findById(userId);

        if (!user) 
            return res.status(404).json({ message: `User with id ${userId} not found`});

        res.status(200).json(user.playlists.filter(playlist => playlist._id == playlistId));

    } catch(err) {
        res.status(400).json({ message: err.message });
    }
});


// add an existing song to the specific user's playlist 
router.patch('/:account_id/playlists/:playlist_id/addTrack', async (req, res) => {
    try { 
        const user = await User.findById(req.params.account_id);
        const playlist = user.playlists.filter(playlist => playlist._id == req.params.playlist_id)[0];
        
        playlist.tracks.push(req.body.track_id);
        await user.save();
        res.status(200).json(user);
        
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
});

module.exports = router;