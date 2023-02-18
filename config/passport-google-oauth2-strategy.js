const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');


// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID: "1082399222186-ufk6897p2dlqlcr61km7dbv93fm6q3bn.apps.googleusercontent.com", // e.g. asdfghjkkadhajsghjk.apps.googleusercontent.com
        clientSecret: "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", // e.g. _ASDFA%KFJWIASDFASD#FAD-
        callbackURL: "http://localhost:8000/users/auth/google/callback",
    },
  function (accesToken, refreshToken, profile, done) { //profile will contain users info

        //find a user
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if (err) { console.log('error in google stategy-passport', err); return }

            console.log(profile);

            if (user) {
                //if found set as req.user
                return done(null, user);
            } else {

                //if not found , create a user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function (err, user) {
                    if (err) { console.log('error in google strategy-passport', err); return }

                    return done(null, user);
                })
            }
        })
    }

));

module.exports = passport;




//     function(accessToken, refreshToken, profile, done){
//         // find a user
//         User.findOne({email: profile.emails[0].value}).exec(function(err, user){
//             if (err){console.log('error in google strategy-passport', err); return;}
//             console.log(accessToken, refreshToken);
//             console.log(profile);

//             if (user){
//                 // if found, set this user as req.user
//                 return done(null, user);
//             }else{
//                 // if not found, create the user and set it as req.user
//                 User.create({
//                     name: profile.displayName,
//                     email: profile.emails[0].value,
//                     password: crypto.randomBytes(20).toString('hex')
//                 }, function(err, user){
//                     if (err){console.log('error in creating user google strategy-passport', err); return;}

//                     return done(null, user);
//                 });
//             }

//         }); 
//     }


// ));


// module.exports = passport;
