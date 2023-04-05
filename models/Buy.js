const {Model, DataTypes} = require('sequelize');
const sequelize = require('./index');

class Buy extends Model {}

Buy.init({
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    sequelize,
    timestamps: true,
    modelName: "buy"
});

module.exports = Buy;