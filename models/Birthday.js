const {Model, DataTypes} = require('sequelize');
const sequelize = require('./index');

class Birthday extends Model {}

Birthday.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    day: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    month: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    timestamps: true,
    modelName: "birthday"
});

module.exports = Birthday;