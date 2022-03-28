const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const secret = 'secret';
const auth = require('../auth/auth');
const { findById } = require('../models/User');
//@Route GET /users/
//@Desc Get a single user
//@Type Private
router.get('/', auth, async (req, res) => {
    try {
        const id = req.user;
        const user = await User.findById(id);
        const newUser = {
            id: user._id,
            username: user.username,
            name: user.name
        }
        res.json(newUser);
    } catch (error) {
        res.status(500).json({ msg: 'Something went wrong, please try again.' });
    }

});

//@Route POST /users/signup
//@Desc Sign up a user
//@Type Public
router.post('/signup', async (req, res) => {
    try {
        const { name, username, password } = req.body;

        let user = await User.findOne({ username: username });

        if (user) {
            return res.status(400).json('User already exist!');
        }

        const newPass = await bcrypt.hash(password, 10);

        user = {
            name,
            username,
            password: newPass
        }

        user = new User(user);

        await user.save();

        const token = jwt.sign({ id: user._id }, secret, { expiresIn: '3600' });

        res.json({ token: token });

    } catch (error) {
        res.status(500).json({ msg: 'Something went wrong, please try again.' });
    }

});

//@Route POST /users/signin
//@Desc Sign in a user
//@Type Public
router.post('/signin', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username: username });

        if (user) {
            const compare = await bcrypt.compare(password, user.password);
            if (!compare) return res.status(400).json({ msg: 'Invalid Password!' });
            const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1h' });
            res.json(token);
        } else {
            return res.status(400).json({ msg: 'Invalid Credentials!' });
        }
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
})

module.exports = router;