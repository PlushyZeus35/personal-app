
const User = require('./user');
const Weight = require('./Weight');

// Users - Weights relation
User.hasMany(Weight)
Weight.belongsTo(User);
