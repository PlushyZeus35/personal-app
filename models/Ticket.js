const {Model, DataTypes} = require('sequelize');
const sequelize = require('./index');

class Ticket extends Model {}

Ticket.init({
    shop: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    sequelize,
    timestamps: true,
    modelName: "ticket"
});

module.exports = Ticket;