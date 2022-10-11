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

//    Delete all tracks in database
router.delete('/', function(req, res, next) {
    Track.deleteMany(function (err, docs) {
        if (err){
            res.status(400)
        }
        else{
            res.status(200).json(docs);
        }
});
});

module.exports = router;