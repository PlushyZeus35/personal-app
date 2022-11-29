var express = require('express');
const { isLoggedIn } = require('../helpers/Authentication');
const UserListener = require('../helpers/UserListener');
const WeightListener = require('../helpers/WeightListener');
const Crypto = require('../helpers/Crypto');
const Binance = require('../helpers/BinanceHelper');
const BinanceListener = require('../helpers/BinanceListener');
var router = express.Router();

/* GET Index page. */
router.get('/', isLoggedIn,async (req, res) => {
    const actualUser = req.user;
    const userWeightData = await WeightListener.getUsersWeights(req.user.id);
    res.render('weight',{userWeightData, actualUser});
})

/* GET Login page. */
router.get('/login', (req, res) => {
    res.render('login');
})

/* GET Login page. */
router.get('/registro', (req, res) => {
    res.render('register');
})

router.post('/weights', isLoggedIn, async (req, res) => {
    const weightValue = req.body.weightValue;
    const dateValue = req.body.dateValue;
    const newWeight = await WeightListener.setNewWeight(dateValue, weightValue, req.user.id);
    res.redirect('/');
})

module.exports = router;