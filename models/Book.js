const {Model, DataTypes} = require('sequelize');
const sequelize = require('./index');

class Book extends Model {}

Book.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pages: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    owned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    reading: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    finished: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    initDate: {
        type: DataTypes.DATEONLY
    },
    finishDate: {
        type: DataTypes.DATEONLY
    },
    predictedFinished: {
        type: DataTypes.DATEONLY
    },
    predictedPPD: {
        type: DataTypes.FLOAT
    },
    PPD: {
        type: DataTypes.FLOAT
    }
}, {
    sequelize,
    timestamps: true,
    modelName: "book"
});

module.exports = Book;