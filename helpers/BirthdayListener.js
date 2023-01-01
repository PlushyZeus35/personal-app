const BirthdayListener = {};
const Birthday = require('../models/Birthday');

BirthdayListener.getBirthdays = async(userId) => {
    return await Birthday.findAll({
        where: {
            userId: userId
        },
        order: ['day']
    })
}

BirthdayListener.getBirthday = async(birthId) => {
    return await Birthday.findByPk(birthId);
}

BirthdayListener.deleteBirthday = async (birthId) => {
    return await Birthday.destroy({
        where: {
            id: birthId
        }
    })
}

BirthdayListener.setBirthday = async (name, day, month, userId) => {
    return await Birthday.create({
        name: name,
        day: day,
        month: month,
        userId: userId
    })
}

BirthdayListener.updateBirthday = async (name,day,month, birthId) => {
    return await Birthday.update({
        name: name,
        day: day,
        month: month
    },{
        where:{id: birthId}
    })
}

BirthdayListener.getNextBirthdays = async (num, userId) => {
    return await Birthday.findAll({
        where: {
            userId: userId
        },
        order: ['month','day'],
        limit: num
    })
}

BirthdayListener.getCountBirthdaysMonth = async (month, userId) => {
    return await Birthday.count({
        where: {
            userId: userId,
            month: month
        }
    })
}

module.exports = BirthdayListener;