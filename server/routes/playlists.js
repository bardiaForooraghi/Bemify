const mongoose = require('mongoose');
const express = require('express');
const {Playlist} = require('../models/playlist');
const {User} = require('../models/user');


const router = express.Router({ mergeParams: true });

// get a specific playlist (single item)
router.get('/:playlist_id', async (req, res) => {
    const playlist = await Playlist.findById(req.params.playlist_id);

    if (!playlist) 
        return res.status(404).send('Playlist Not Found!');

    try {
        res.send(playlist);
    } catch(err) {
        res.status(400).json({message: err.message});
    }
});

// get all the tracks from a playlist
router.get('/:playlist_id/tracks', async (req, res) => {
    const playlist = await Playlist.find({_id: req.params.playlist_id}).populate('tracks').populate('artisttracks')

    if (!playlist) {
        return res.status(404).json({ message: 'Playlist was not found!'});
    }
    try {
        res.json(playlist);
    } catch(err) {
        res.status(400).json({ message: err.message });
    }  
})

// creating a new playlist (collection)
router.post('/', async(req, res) => {
    try {
        let playlist = new Playlist({
            name: req.body.name,
            tracks: req.body.tracks,
            owner: req.body.owner,
            artisttracks: req.body.artisttracks
        });
        playlist = await playlist.save();
        res.json(playlist);
    } catch (e) {
        res.status(400).send(e.message);
    } 
});


// add an existing song to the specific user's playlist 
router.patch('/:playlist_id/addTrack', async (req, res) => {
    let playlist = await Playlist.findById(req.params.playlist_id);

    if (!playlist) {
        return res.status(404).send('Playlist Not Found!');
    } else {
        if(playlist.tracks.includes(req.body.track_id)) {
            return res.status(400).send('Playlist already has this song!')
        } else {
            playlist.tracks.push(req.body.track_id)
            playlist = await playlist.save()
        }
    res.send(playlist);
    }
});

// add an artist song to the specific user's playlist 
router.patch('/:playlist_id/addArtistTrack', async (req, res) => {
    let playlist = await Playlist.findById(req.params.playlist_id);

    if (!playlist) {
        return res.status(404).send('Playlist Not Found!');
    } else {
        if(playlist.artisttracks.includes(req.body.track_id)) {
            return res.status(400).send('Playlist already has this song!')
        } else {
            playlist.artisttracks.push(req.body.track_id)
            playlist = await playlist.save()
        }
    res.send(playlist);
    }
});

//remove track from a playlist
router.delete('/:playlist_id/tracks/:track_id', async(req, res) => {
    try { 
        let playlist = await Playlist.findById(req.params.playlist_id);

        if (!playlist) {
            return res.status(404).send('Playlist Not Found!');
        } else {
            const result = await playlist.update({$pull: {tracks: req.params.track_id}}, {new: true});
            playlist = await playlist.save()
        res.send(playlist);
    }

    } catch (e) {
        res.status(400).json({ message: e.message });
    }
})

//remove artist track from a playlist
router.delete('/:playlist_id/artisttracks/:track_id', async(req, res) => {
    try { 
        let playlist = await Playlist.findById(req.params.playlist_id);

        if (!playlist) {
            return res.status(404).send('Playlist Not Found!');
        } else {
            const result = await playlist.update({$pull: {artisttracks: req.params.track_id}}, {new: true});
            playlist = await playlist.save()
        res.send(playlist);
    }

    } catch (e) {
        res.status(400).json({ message: e.message });
    }
})

// return user's playlists' genre
router.get('/:playlist_id/filter', async (req, res) => {
    const playlist = await Playlist.findById(req.params.playlist_id).populate("tracks").populate("artisttracks");

    if (!playlist) {
        return res.status(404).send('Playlist Not Found!');
    } else {
        let result = playlist.tracks.filter(track => {
            return track.genre == req.body.genre
        });   

        let result2 = playlist.artisttracks.filter(track => {
            return track.genre == req.body.genre
        })

        result = result.concat(result2)
    res.send(result);
    
    }
});


module.exports = router;
