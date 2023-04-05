const {Model, DataTypes} = require('sequelize');
const sequelize = require('./index');

class Product extends Model {}

Product.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    timestamps: true,
    modelName: "product"
});

module.exports = Product;