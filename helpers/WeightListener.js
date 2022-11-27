const Weight = require('../models/Weight');
const WeightListener = {};
const { Op, DataTypes } = require("sequelize");

WeightListener.getUsersWeights = async (userId) => {
    return await Weight.findAll({
        where: {
            userId: userId
        },
        order: [
            ['date', 'DESC']
        ]
    });
}

WeightListener.setNewWeight = async (date, value, userId) => {
    return await Weight.create({
        date: date,
        value: value,
        userId: userId
    });
}

WeightListener.getAllWeights = async () => {
    return await Weight.findAll();
}

module.exports = WeightListener;