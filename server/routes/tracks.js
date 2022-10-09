const mongoose = require('mongoose');

const express = require('express');
const {Playlist} = require('../models/playlist');
const {Track} = require('../models/track');

const router = express.Router();

// get a specific track (single item)
router.get('/:track_id', async (req, res) => {
    const track = await Track.findById(req.params.track_id);

    if (!track) {
        res.status(404).send('Track Not Found!');
    }
        
    res.send(track);
});

module.exports = router;