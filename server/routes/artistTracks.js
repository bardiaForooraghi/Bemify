const mongoose = require('mongoose');

const express = require('express');
const {ArtistTrack} = require('../models/artistTrack');

const router = express.Router();

// get a specific artist track (single item)
router.get('/:artistTrack_id', async (req, res) => {
    const track = await ArtistTrack.findById(req.params.artistTrack_id);

    if (!track) {
        return res.status(404).send('Artist Track Not Found!');
    }
        
    res.send(track);
});

//    Delete all artist tracks in database
router.delete('/', function(req, res, next) {
    ArtistTrack.deleteMany(function (err, docs) {
        if (err){
            return res.status(400)
        }
        else{
            res.status(204).json(docs);
        }
    });
});


// Delete a specific track from the database
router.delete('/:artistTrack_id', function(req, res, next) {
    ArtistTrack.findOneAndDelete({_id: req.params.artistTrack_id }, function (err, docs) {
        if (err){
            return res.status(400)
        }
        else{
            res.status(204).json(docs);
        }
    });
});

// Update a tracks information
router.put('/:artistTrack_id',  async (req, res) => {
    let artistTrack = await ArtistTrack.findById(req.params.artistTrack_id);
    
    if (!track) 
        return res.status(404).message('Artist Track Not Found!');

    try {
        artistTrack.name = req.body.name;
        artistTrack.artist = req.body.artist;
        artistTrack.genre = req.body.genre;
        artistTrack.duration = req.body.duration;
        track = await track.save();
        res.status(200).send(artistTrack);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

// creating a new artist track
router.post('/', async(req, res) => {
    try {
        let track = new ArtistTrack({
            name: req.body.name,
            artist: req.body.artist,
            duration: req.body.duration,
            genre: req.body.genre
        });
        track = await track.save();
        res.status(201).json(track);
    } catch (e) {
        res.status(400).send(e.message);
    } 
});


// get all filtered tracks (collection)
router.get('/', async (req, res) => {
    ArtistTrack.find({}, function(err, artistTracks) {
        if(err) {
            return res.status(404).message('Something went wrong!')
        }
        const result = artistTracks.filter(track => {
            if(req.query.name == ""){
                return artistTracks
            } else {
                return track.name.includes(req.query.name)
            }
        });
    
        res.json(result);
    })
})


module.exports = router;