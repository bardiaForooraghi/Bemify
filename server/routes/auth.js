const mongoose = require('mongoose');
const express = require('express');
const {User} = require('../models/user');
const bcrypt = require('bcrypt');


const router = express.Router({ mergeParams: true });

router.post('/', async (req, res) => {
    let user = await User.findOne({username: req.body.username});
    if (!user) 
        return res.status(400).send('Invalid username or password');

    try {    
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword)
            return res.status(400).send('Invalid username or password');

        const token = user.generateAuthToken();    
        res.status(200).send(token);
    } catch (e) {
        return res.status(400).send(e.message);
    }
});

module.exports = router;