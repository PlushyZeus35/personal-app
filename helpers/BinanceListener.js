const Binance = require("../models/Binance");

const BinanceListener = {};

BinanceListener.getUserCredentials = (async (userId) => {
    return await Binance.findAll({
        userId: userId
    })
});

BinanceListener.setCredentials = (async (apikey,apisecret,userId) => {
    return await Binance.create({
        apikey: apikey,
        apisecret: apisecret,
        userId: userId
    })
})

module.exports = BinanceListener;