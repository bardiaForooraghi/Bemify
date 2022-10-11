const mongoose = require('mongoose');
const express = require('express');
const {Playlist} = require('../models/playlist');


const router = express.Router({ mergeParams: true });

// get a specific playlist (single item)
router.get('/:playlist_id', async (req, res) => {
    const playlist = await Playlist.findById(req.params.playlist_id);

    if (!playlist) 
        res.status(404).send('Playlist Not Found!');

    res.send(playlist);
});


module.exports = router;
