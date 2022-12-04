const User = require('./user');
const Weight = require('./Weight');
const Binance = require('./Binance');
const CriptoData = require('./CriptoData');
const Birthday = require('./Birthday');

// Users - Weights relation
User.hasMany(Weight);
Weight.belongsTo(User);

// Users - Binance data relation
User.hasMany(Binance);
Binance.belongsTo(User);

// Users - CriptoData relation
User.hasMany(CriptoData);
CriptoData.belongsTo(User);

// Users - Birthday relation
User.hasMany(Birthday);
Birthday.belongsTo(User);