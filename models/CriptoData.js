const {Model, DataTypes} = require('sequelize');
const sequelize = require('./index');

class CriptoData extends Model {}

CriptoData.init({
    asset: {
        type: DataTypes.STRING,
        allowNull: false
    },
    value: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    fromSystem: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    sequelize,
    timestamps: true,
    paranoid: true,
    modelName: "criptodata"
});

module.exports = CriptoData;