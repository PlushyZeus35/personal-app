const {Model, DataTypes} = require('sequelize');
const sequelize = require('./index');

class Task extends Model {}

Task.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    daily: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    done: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
}, {
    sequelize,
    timestamps: true,
    modelName: "task"
});

module.exports = Task;