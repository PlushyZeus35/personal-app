var express = require('express');
const { isLoggedIn } = require('../helpers/Authentication');
const WeightListener = require('../helpers/WeightListener');
var router = express.Router();

/* GET Index page. */
router.get('/', isLoggedIn,async (req, res) => {
    console.log(req.user);
    const userWeightData = await WeightListener.getUsersWeights(req.user.id);
    console.log(userWeightData);
    res.render('weight',{userWeightData});
})

/* GET Login page. */
router.get('/login', (req, res) => {
    console.log(req.user);
    res.render('login');
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