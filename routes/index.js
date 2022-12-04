var express = require('express');
const { isLoggedIn } = require('../helpers/Authentication');
const UserListener = require('../helpers/UserListener');
const WeightListener = require('../helpers/WeightListener');
const Crypto = require('../helpers/Crypto');
const Binance = require('../helpers/BinanceHelper');
const BinanceListener = require('../helpers/BinanceListener');
const BirthdayListener = require('../helpers/BirthdayListener');
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

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile', {user: req.user});
})

router.get('/birthday', isLoggedIn,async (req, res) => {
    const birthdays = await BirthdayListener.getBirthdays(req.user.id);
    res.render('birthday', {birthdays: birthdays});
})

router.post('/birthday', isLoggedIn, async (req, res) => {
    const birthname = req.body.birthname;
    const birthday = req.body.birthday;
    const birthmonth = req.body.birthmonth;
    const newBirth = await BirthdayListener.setBirthday(birthname,birthday,birthmonth,req.user.id);
    res.redirect('/birthday');
})

router.post('/editbirthday', isLoggedIn, async (req, res) => {
    const birthId = req.body.birthid;
    const birthname = req.body.birthname;
    const birthday = req.body.birthday;
    const birthmonth = req.body.birthmonth;
    const newBirth = await BirthdayListener.updateBirthday(birthname,birthday,birthmonth,birthId);
    res.redirect('/birthday');
})

router.post('/profile', isLoggedIn, async (req, res) => {
    const email = req.body.editedEmail;
    await UserListener.updateUser(req.user.id,email);
    req.user.email = email;
    res.redirect('/profile');
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