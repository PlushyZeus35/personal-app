const {Model, DataTypes} = require('sequelize');
const sequelize = require('./index');

class Binance extends Model {}

Binance.init({
    apikey: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apisecret: {
        type: DataTypes.STRING,
        allowNull: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    sequelize,
    timestamps: true,
    modelName: "binance"
});

module.exports = Binance;