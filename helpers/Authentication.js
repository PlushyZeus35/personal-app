
module.exports = {
    isLoggedIn(req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        }else{
            res.redirect('/login');
        }
    },

    isNotLoggedIn(req, res, next) {
        if(req.isAuthenticated()){
            res.redirect('/profile');
        }else{
            return next();
        }
    }
}