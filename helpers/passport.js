const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserListener = require('../helpers/UserListener');
const Crypto = require('./Crypto');

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    console.log({username, password});
    const userSelected = await UserListener.getUserByUsername(username);
    console.log(JSON.stringify(userSelected, null, 4));
    console.log(password);
    if(userSelected.length>0){
        if(await Crypto.validatePassword(userSelected[0].password, password)){
            done(null, userSelected[0], req.flash('Success', 'Success'));
        }else{
            done(null, false, req.flash('Message', ['Error de inicio de sesión', 'Credenciales de acceso incorrectas.']));
        }
    }else{
        done(null, false, req.flash('Message', ['Error de inicio de sesión', 'Ese usuario no existe en nuestro sistema.']));
    }
}))

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });