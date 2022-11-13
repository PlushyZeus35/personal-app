var express = require('express');
const { isLoggedIn } = require('../helpers/Authentication');
var router = express.Router();

/* GET Index page. */
router.get('/', isLoggedIn, (req, res) => {
    console.log(req.user)
    res.render('weight');
})

/* GET Login page. */
router.get('/login', (req, res) => {
    console.log(req.user);
    res.render('login');
})

module.exports = router;