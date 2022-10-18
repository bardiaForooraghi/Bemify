const mongoose = require('mongoose');

const express = require('express');
const {User} = require('../models/user');
const {Playlist} = require('../models/playlist');
const {Track} = require('../models/track');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

const router = express.Router();

// create a playlist for a user (post a collection/single item)
router.put('/:account_id/newPlaylist', async (req, res) => {
    const user = await User.findById(req.params.account_id);

    if (!user) {
        return res.status(404).send('User Not Found!');
    } else if (req.body.name === "") {
        return res.status(400).send('Playlist name cannot be empty!');
    }
        
    try {
        let playlist = new Playlist({
            name: req.body.name,
            tracks: req.body.tracks,
            owner: req.params.account_id
        });

        const result1 = await playlist.save()

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
        return res.status(404).send('User Not Found!');

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
        return res.status(404).message('User Not Found!');

    try {
        Playlist.findByIdAndDelete({_id: req.params.playlist_id}, function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                console.log("Deleted : ", docs);
            }
        });
        const result = await user.update({$pull: {playlists: req.params.playlist_id}}, {new: true});
        const result2 = await user.save();
        res.send(result2);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

// delete all playlists for a user
router.delete('/:account_id/playlists/', async (req, res) => {
    const user = await User.findById(req.params.account_id);

    if (!user) 
        return res.status(404).message('User Not Found!');

    try {
        Playlist.deleteMany({owner: req.params.account_id}, function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                console.log("Deleted : ", docs);
            }
        });
        const result = await user.update({$set: {playlists: []}}, {new: true});
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

// Upload a song to the user's playlist
router.post('/:account_id/playlists/:playlist_id/newTrack', async (req, res) => {
    const playlistId = req.params.playlist_id;

    try {
        const user = await User.findById(req.params.account_id);
        const specificPlaylist = await Playlist.findById(req.params.playlist_id)

        if (!user) 
            return res.status(404).json({ message: `User with id ${user} not found`});

        if(!specificPlaylist)
            return res.status(404).json({ message: `Playlist with id ${playlist} not found`})


        let track = new Track({
            name: req.body.name,
            genre: req.body.genre,
            duration: req.body.duration
        });

        await track.save();

        let playlist = user.playlists.filter(playlist => playlist._id == playlistId)[0];
        playlist.tracks.push(track);
        specificPlaylist.tracks.push(track);
        const result1 = await specificPlaylist.save();
        

        const result = await user.save();
        res.status(200).json(result);

    } catch(err) {
        res.status(400).json({ message: err.message });
    }  
});


// get all the playlists from the specific user
router.get('/:account_id/playlists', async(req, res) => {
    try {
        const user = await User.find({_id: req.params.account_id}).populate("playlists")

        if (!user) {
            return res.status(404).json({ message: 'User was not found!'});
        }

        res.json(user);

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

// get all filtered users (collection)
router.get('/:account_id/users', async (req, res) => {
    User.find({_id: {$ne: req.params.account_id}}, function(err, users) {
        if(err) {
            res.status(404).message('Something went wrong!')
        }
        const result = users.filter(user => {
            if(req.query.username == ""){
                return users
            } else {
                return user.username.includes(req.query.username)
            }
        });
    
        res.json(result);
    })
})

// getting an accounts followers
router.get('/:account_id/followers', async (req, res) => {
    const userId = req.params.account_id;

    try {
        const userId = await User.findById(req.params.account_id);

        if (!userId) 
            return res.status(404).json({ message: `User with id ${userId} not found`});

        if (userId.playlists == null)
            return res.status(404).json({ message: 'Playlists not found'});

        let result = await User.find({_id: userId}).select({followers:1});
        result = result[0].followers;
        res.json(result);

    } catch(err) {
        res.status(400).json({ message: err.message });
    } 
});

// getting an accounts follwings
router.get('/:account_id/followings', async (req, res) => {
    const userId = req.params.account_id;

    try {
        const userId = await User.findById(req.params.account_id);

        if (!userId) 
            return res.status(404).json({ message: `User with id ${userId} not found`});

        if (userId.playlists == null)
            return res.status(404).json({ message: 'Playlists not found'});

        let result = await User.find({_id: userId}).select({followings:1});
        result = result[0].followings;
        res.json(result);

    } catch(err) {
        res.status(400).json({ message: err.message });
    } 
});

// getting a specific follower from an account
router.get('/:account_id/followers/:follower_id', async (req, res, next) => {
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
router.patch('/:account_id/followers/:follower_id', async (req, res, next) => {
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
                return res.status(406).json({'message': 'You are already following this account!'})
            }
            if(id1 == id2){
                return res.status(406).json({'message': 'You cannot follow yourself!'})
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
router.delete('/:account_id/following/:following_id', async (req, res, next) => {
    let id1 = req.params.account_id;
    let id2 = req.params.following_id;
    User.findById(id1, function(err, user1){
        if(err){return next(err);}
        if(user1 === null) {
            return res.status(404).json({'message': 'This account has not been found!'})
        }
        User.findById(id2, function(err, user2){
            if(err){return next(err);}
            if(user2 === null) {
                return res.status(404).json({'message': 'This account has hehe not been found!'})
            }
            if(!user2.followers.includes(id1) || !user1.followings.includes(id2)){
                return res.status(406).json({'message': 'You are not following this account!'})
            }
            if(id1 == id2){
                return res.status(406).json({'message': 'You cannot unfollow yourself!'})
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
    Playlist.deleteMany({owner: req.params.account_id}, function (err, docs) {
        if (err){
            return res.status(400)
        }
        else{
            console.log("Deleted Playlists: ", docs);
        }
    });

    User.updateMany({followers: {_id: req.params.account_id}}, {$pull: {followers: req.params.account_id}}, function (err, docs) {
        if (err){
            return res.status(400)
        }
    })

    User.updateMany({followings: {_id: req.params.account_id}}, {$pull: {followings: req.params.account_id}}, function (err, docs) {
        if (err){
            return res.status(400)
        }
    })

    User.findOneAndDelete({_id: req.params.account_id }, function (err, docs) {
        if (err){
            return res.status(400)
        }
        else{
            res.status(200).json(docs);
        }
    });
});



// Update a user's profile information
router.put('/:account_id',  async (req, res) => {
    let user = await User.findById(req.params.account_id);
    
    if (!user) 
        res.status(404).message('User Not Found!');

    try {
        user.username = req.body.username;
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
        user.email = req.body.email;
        const token = user.generateAuthToken();
        user = await user.save();
        res.json({token, user});
        res.status(200).send(user);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

// Update a user's username information
router.patch('/:account_id/username', async (req, res) => {
    let user = await User.findById(req.params.account_id);

    if (!user) {
        res.status(404).message('User Not Found!');
    } else {
        user.username = req.body.username;
        const token = user.generateAuthToken();
        user = await user.save();
        res.json({token, user});
    }

});

// Update a user's email information
router.patch('/:account_id/email', async (req, res) => {
    let user = await User.findById(req.params.account_id);

    if (!user) {
        res.status(404).message('User Not Found!');
    }

    try {
        user.email = req.body.email;
        const token = user.generateAuthToken();
        user = await user.save();
        res.json({token, user});
        res.status(200).send(user);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

// Update a user's password information
router.patch('/:account_id/password', async (req, res) => {
    let user = await User.findById(req.params.account_id);

    if (!user) 
        res.status(404).message('User Not Found!');

    try {
        user.password = await bcrypt.hash(req.body.password, salt);
        const salt = await bcrypt.genSalt(10);
        const token = user.generateAuthToken();
        user = await user.save();
        res.json({token, user});
        res.status(200).send(user);
    } catch (e) {
        res.status(400).send(e.message);
    }
});


// Delete all users in database
router.delete('/', function(req, res, next) {
    User.deleteMany(function (err, docs) {
        if (err){
            res.status(400)
        }
        else{
            res.status(200).json(docs);
        }
    });
});

module.exports = router;