const express = require('express');
const router = express.Router();
const passport = require('passport');

// const authentication = require('../config/passport-local-startegy')
const checkAuthentication = require('../config/passport-local-startegy')
const usersController = require('../controllers/user_controller');
// console.log(passport.checkAuthentication)
// router.get('/profile', passport.checkAuthentication, usersController.profile);  

router.get("/profile/:id",checkAuthentication, usersController.profile)
router.post('/update/:id', checkAuthentication, usersController.update);

router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);


router.post('/create', usersController.create);

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), usersController.createSession);


router.get("/sign-out", usersController.destroySession);

module.exports = router;