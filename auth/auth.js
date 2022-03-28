const jwt = require('jsonwebtoken');
const User = require('../models/User');
const secret = 'secret';

const auth = (req, res, next) => {
    const token = req.header('X-Auth-Token');
    try {
        const verifyToken = jwt.verify(token, secret);
        if (verifyToken) {
            req.user = verifyToken.id;
            next();
        } else {
            res.status(401).json({ msg: 'Unauthorized Access!' });
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

module.exports = auth;