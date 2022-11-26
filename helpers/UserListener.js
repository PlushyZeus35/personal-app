const User = require('../models/user');
const UserListener = {};
const { Op, DataTypes } = require("sequelize");

UserListener.getUserByUsername = async (username) => {
    return await User.findAll({
        where: {
            username: username
        }
    });
}

UserListener.setNewUser = async (username, password, mail) => {
    return await User.create({
        username: username,
        password: password,
        email: mail
    })
}

module.exports = UserListener;