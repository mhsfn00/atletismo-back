const express = require('express');
const router = express.Router();
const passport = require('../models/OAuthStrategy');

router.get('/', 
    passport.authenticate('oauth2', { scope: ['profile'] }), // Request the necessary scopes 
    function(req, res) { 
        // The request will be redirected to the authorization server
    }
);

router.get('/callback', 
    passport.authenticate('oauth2', { failureRedirect: '/login' }), 
    function(req, res) {
        // Successful authentication
        req.session.user = req.user; // Store user information in session
        res.redirect('/'); 
    }
);

module.exports = router;