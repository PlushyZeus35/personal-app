const {Model, DataTypes} = require('sequelize');
const sequelize = require('./index');

class Weight extends Model {}

Weight.init({
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    value: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    sequelize,
    timestamps: true,
    modelName: "weight"
});

module.exports = Weight;