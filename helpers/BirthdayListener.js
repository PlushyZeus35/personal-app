const BirthdayListener = {};
const Birthday = require('../models/Birthday');

BirthdayListener.getBirthdays = async(userId) => {
    return await Birthday.findAll({
        where: {
            userId: userId
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

module.exports = BirthdayListener;