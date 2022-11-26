var express = require('express');
const { isLoggedIn } = require('../helpers/Authentication');
const UserListener = require('../helpers/UserListener');
const WeightListener = require('../helpers/WeightListener');
const Crypto = require('../helpers/Crypto');
var router = express.Router();

/* GET Index page. */
router.get('/', isLoggedIn,async (req, res) => {
    const actualUser = req.user;
    console.log(req.user);
    const userWeightData = await WeightListener.getUsersWeights(req.user.id);
    console.log(userWeightData);
    res.render('weight',{userWeightData, actualUser});
})

/* GET Login page. */
router.get('/login', (req, res) => {
    console.log(req.user);
    res.render('login');
})

/* GET Login page. */
router.get('/registro', (req, res) => {
    console.log(req.user);
    res.render('register');
})

router.post('/weights', isLoggedIn, async (req, res) => {
    console.log(req.user);
    const weightValue = req.body.weightValue;
    const dateValue = req.body.dateValue;
    console.log(dateValue);
    console.log(typeof dateValue);
    const newWeight = await WeightListener.setNewWeight(dateValue, weightValue, req.user.id);
    res.redirect('/');
})

module.exports = router;