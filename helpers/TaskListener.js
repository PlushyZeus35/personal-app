const Task = require('../models/Task');
const TaskListener = {};
const { Op, DataTypes, where } = require("sequelize");

TaskListener.createTask = async (name, daily, userId) => {
    return await Task.create({
        name: name,
        daily: daily,
        userId: userId
    });
}

TaskListener.getUserTask = async (userId) => {
    return await Task.findAll({
        where: {
            userId: userId
        }
    })
}

TaskListener.doTask = async (taskId) => {
    return await Task.update({
        done: true
    },{
        where:{id: taskId}
    })
}

TaskListener.deleteTask = async (taskId) => {
    return await Task.destroy({
        where:{id:taskId}
    })
}

TaskListener.updateTask = async (taskName, taskId) => {
    return await Task.update({
        name: taskName
    },{where:{id:taskId}})
}

module.exports = TaskListener;