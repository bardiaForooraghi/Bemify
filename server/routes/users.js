const mongoose = require('mongoose');
const express = require('express');
const {User} = require('../models/user');

const router = express.Router();


router.post('/', async (req, res) => {
    try {
        let user = new User({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            profilePicture: req.body.profilePicture,
            playlist: req.body.Playlist,
            followers: req.body.followers,
            followings: req.body.followings
        });
        user = await user.save();
        res.send(user);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

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

router.get('/:account_id', async (req, res) => {
    let id = req.params.account_id;
    User.findById(id, function(err, user){
        if(err){return next(err);}
        if(user === null) {
            return res.status(404).json({'message': 'This account has not been found!'})
        }
        res.send(user);
    })
});

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
})

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
})

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


module.exports = router;
