const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserListener = require('../helpers/UserListener');

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    console.log({username, password});
    const userSelected = await UserListener.getUserByUsername(username);
    console.log(JSON.stringify(userSelected, null, 4));
    console.log(password);
    console.log(userSelected[0].password);
    if(password == userSelected[0].password){
        console.log("a")
        done(null, userSelected[0], req.flash('Success', 'Success'));
    }else{
        done(null, false, req.flash('Success', 'Success'));
    }
    //done(null, user, req.flash(Constants.FLASH.SUCCESS, Constants.LABELS.SUCCESS.WELCOME + user.username));
    //done(null, false, req.flash(Constants.FLASH.ERROR, Constants.LABELS.ERROR.INCORRECT_PASSWORD));
    //(null, false, req.flash(Constants.FLASH.ERROR, Constants.LABELS.ERROR.USERNAME_DONT_EXIST));
}))

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });