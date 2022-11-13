const Weight = require('../models/Weight');
const WeightListener = {};
const { Op, DataTypes } = require("sequelize");

WeightListener.getUsersWeights = async (userId) => {
    return await Weight.findAll({
        where: {
            userId: userId
        }
    });
}

module.exports = WeightListener;