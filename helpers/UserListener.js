const User = require('../models/User');
const UserListener = {};
const { Op, DataTypes } = require("sequelize");

UserListener.getUserByUsername = async (username) => {
    return await User.findAll({
        where: {
            username: username
        }
    });
}

module.exports = UserListener;