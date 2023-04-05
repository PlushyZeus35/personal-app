const {Model, DataTypes} = require('sequelize');
const sequelize = require('./index');

class Shop extends Model {}

Shop.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    timestamps: true,
    modelName: "shop"
});

module.exports = Shop;