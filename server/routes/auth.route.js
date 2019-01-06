const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const config = require('../config/config')

const router = express.Router();

// post login pass by passport authentification
router.post('/login', passport.authenticate('local', { session: false }), (req, res)=>{
    let user = req.user;
    let token = generateToken(user);
    res.json({user, token});
});

// generate a jwt token
function generateToken(user){
    const payload = JSON.stringify(user);
    return jwt.sign(payload, config.jwtSecret);
}

module.exports = router;