var express = require('express');
const passport = require('passport');
const UserListener = require('../helpers/UserListener');
const Crypto = require('../helpers/Crypto');
var router = express.Router();

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

router.post('/register',async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.mail;
    const passwordHashed = await Crypto.hashPassword(password);
    console.log({username,password,passwordHashed,email});
    const user = await UserListener.getUserByUsername(username);
    if(user.length > 0){
        res.redirect('/registro');
    }else{
        const newUser = await UserListener.setNewUser(username, passwordHashed, email);
        if(newUser.id){
            res.redirect('/login');
        }else{
            res.redirect('/register');
        }
    }
});

router.get('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});


module.exports = router;