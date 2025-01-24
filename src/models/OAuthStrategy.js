const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2').Strategy;
import 'dotenv/config';

passport.use(new OAuth2Strategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLEINT_SECRET,
    authorizationURL: process.env.AUTH_URL, 
    tokenURL: process.env.TOKEN_URL,
    callbackURL: process.env.CALLBACK_URL
    // Replace with your actual callback URL
},
function(accessToken, refreshToken, profile, done) {
    // This function is called after successful authentication.
    // You can access user information from the `profile` object.
    // 
    // Example:
    // profile.id 
    // profile.displayName 
    // profile.emails 

    // Create or find a user in your database based on the profile information.
    // For example:
    // User.findOne({ oauthID: profile.id }, function(err, user) {
    //     if (err) { return done(err); }
    //     if (user) { 
    //         return done(null, user); 
    //     } else {
    //         // Create a new user account 
    //         // ...
    //     }
    // });
}));

module.exports = passport;