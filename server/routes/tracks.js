const mongoose = require('mongoose');

const express = require('express');
const {Playlist} = require('../models/playlist');
const {Track} = require('../models/track');

const router = express.Router();

// get a specific track (single item)
router.get('/:track_id', async (req, res) => {
    const track = await Track.findById(req.params.track_id);

    if (!track) {
        return res.status(404).send('Track Not Found!');
    }
        
    res.send(track);
});

//    Delete all tracks in database
router.delete('/', function(req, res, next) {
    Track.deleteMany(function (err, docs) {
        if (err){
            return res.status(400)
        }
        else{
            res.status(200).json(docs);
        }
    });
});


// Delete a specific track from the database
router.delete('/:track_id', function(req, res, next) {
    Track.findOneAndDelete({_id: req.params.track_id }, function (err, docs) {
        if (err){
            return res.status(400)
        }
        else{
            res.status(200).json(docs);
        }
    });
});

// Update a tracks information
router.put('/:track_id',  async (req, res) => {
    let track = await Track.findById(req.params.track_id);
    
    if (!track) 
        return res.status(404).message('Track Not Found!');

    try {
        track.name = req.body.name;
        track.genre = req.body.genre;
        track.duration = req.body.duration;
        track = await track.save();
        res.status(200).send(track);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

// creating a new track
router.post('/', async(req, res) => {
    try {
        let track = new Track({
            name: req.body.name,
            duration: req.body.duration,
            genre: req.body.genre
        });
        track = await track.save();
        res.json(track);
    } catch (e) {
        res.status(400).send(e.message);
    } 
});


// get all filtered tracks (collection)
router.get('/', async (req, res) => {
    Track.find({}, function(err, tracks) {
        if(err) {
            return res.status(404).message('Something went wrong!')
        }
        const result = tracks.filter(track => {
            if(req.query.name == ""){
                return tracks
            } else {
                return track.name.includes(req.query.name)
            }
        });
    
        res.json(result);
    })
})


module.exports = router;