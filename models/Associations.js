const User = require('./user');
const Weight = require('./Weight');
const Binance = require('./Binance');

// Users - Weights relation
User.hasMany(Weight);
Weight.belongsTo(User);

// Users - Binance data relation
User.hasMany(Binance);
Binance.belongsTo(User);
