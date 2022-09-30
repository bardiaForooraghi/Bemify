const mongoose = require('mongoose');

const express = require('express');
const {User} = require('../models/user');
const {Playlist} = require('../models/playlist');
const {Track} = require('../models/track');

const router = express.Router();

// create a playlist for a user (post a collection/single item)
router.put('/:account_id/newPlaylist', async (req, res) => {
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

// Upload a song to the user's playlist
router.post('/:account_id/playlists/:playlist_id/newTrack', async (req, res) => {
    const playlistId = req.params.playlist_id;

    try {
        const user = await User.findById(req.params.account_id);

        if (!user) 
            return res.status(404).json({ message: `User with id ${user} not found`});

        let track = new Track({
            name: req.body.name,
            genre: req.body.genre,
            duration: req.body.duration
        });

        let playlist = user.playlists.filter(playlist => playlist._id == playlistId)[0];
        playlist.tracks.push(track);

        const result = await user.save();
        res.status(200).json(result);

    } catch(err) {
        res.status(400).json({ message: err.message });
    }  
});


// get all the playlists from the specific user
router.get('/:account_id/playlists', async(req, res) => {

    const userId = req.params.account_id;

    try {
        const userId = await User.findById(req.params.account_id);

        if (!userId) 
            return res.status(404).json({ message: `User with id ${userId} not found`});

        if (userId.playlists == null)
            return res.status(404).json({ message: 'Playlists not found'});

        let result = await User.find({_id: userId}).select({playlists: 1});
        result = result[0].playlists;
    
        res.json(result);

    } catch(err) {
        res.status(400).json({ message: err.message });
    }  

});


// return user's playlists' genre
router.get('/:account_id/playlists/:playlist_id/filter', async (req, res) => {
    const userId = req.params.account_id;
    const playlistId = req.params.playlist_id;   

    try {
        const user = await User.findById(req.params.account_id);

        if (!user) 
            return res.status(404).json({ message: `User with id ${user} not found`});

        let playlist = user.playlists.filter(playlist => playlist._id == playlistId)[0];
        
        if (!playlist)
            return res.status(404).json({ message: `Playlist with id ${playlistId} not found`});

        const result = playlist.tracks.filter(track => {
            return track.genre == req.body.genre
        });    

        res.json(result);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }  
});

// getting an accounts followers
router.get('/:account_id/followers', async (req, res) => {
    let id = req.params.account_id;
    User.findById(id, function(err, user){
        if(err){return next(err);}
        if(user === null) {
            return res.status(404).json({'message': 'This account has not been found!'})
        }
        res.send(user.followers);
    })
});

// getting a specific follower from an account
router.get('/:account_id/followers/:follower_id', async (req, res) => {
    var id = req.params.account_id;
    var id2 = req.params.follower_id;
    User.findById(id, function(err, user1){
        if(err){return next(err);}
        if(user1 === null) {
            return res.status(404).json({'message': 'This account has not been found!'})
        }
        User.findById(id2, function(err, user2){
            if(err){return next(err);}
            if(user2 === null) {
                return res.status(404).json({'message': 'This account has not been found!'})
            }
            res.json(user2);
        })
    })
});

// following an account & adding to the followers and following lists of the respective users
router.patch('/:account_id/followers/:follower_id', async (req, res) => {
    let id1 = req.params.account_id;
    let id2 = req.params.follower_id;
    User.findById(id1, function(err, user1){
        if(err){return next(err);}
        if(user1 === null) {
            return res.status(404).json({'message': 'This account has not been found!'})
        }
        User.findById(id2, function(err, user2){
            if(err){return next(err);}
            if(user2 === null) {
                return res.status(404).json({'message': 'This account has not been found!'})
            }
            if(user2.followers.includes(id1) || user1.followings.includes(id2)){
                return res.json({'message': 'You are already following this account!'})
            }
            user2.followers.push(user1);
            user1.followings.push(user2);
            user1.save();
            user2.save();
            res.json(user1);
        })
    })
});

// unfollow an account and change the followers/following lists respectively
router.delete('/:account_id/followers/:follower_id', async (req, res) => {
    let id1 = req.params.account_id;
    let id2 = req.params.follower_id;
    User.findById(id1, function(err, user1){
        if(err){return next(err);}
        if(user1 === null) {
            return res.status(404).json({'message': 'This account has not been found!'})
        }
        User.findById(id2, function(err, user2){
            if(err){return next(err);}
            if(user2 === null) {
                return res.status(404).json({'message': 'This account has not been found!'})
            }
            if(!user2.followers.includes(id1) || !user1.followings.includes(id2)){
                return res.json({'message': 'You are not following this account!'})
            }
            user2.followers.pull(user1);
            user1.followings.pull(user2);
            user1.save();
            user2.save();
            res.json(user1);
        })
    })
});


// Delete a specific user from the database
router.delete('/:account_id', function(req, res, next) {
    var id = req.params.account_id;
    User.findOneAndDelete(id, function(err, user) {
        if (err) { return next(err); }
        if (user === null) {
            return res.status(404).json({'message': 'User not found'});
        }
        // res.json(user);
        res.json({"Message": "User deleted"});
    });
});


// Update a user's profile information
router.put('/:account_id',  async (req, res) => {
    let user = await User.findById(req.params.account_id);
    
    if (!user) 
        res.status(404).message('User Not Found!');

    try {
        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;
        // user.profilePicture = req.body.profilePicture;
        // user.playlists = req.body.playlists;
        // user.followers = req.body.followers;
        // user.followings = req.body.followings;
        user = await user.save();
        res.send(user);
    } catch (e) {
        res.status(400).send(e.message);
    }
  });

module.exports = router;