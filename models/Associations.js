
const User = require('./User');
const Weight = require('./Weight');

// Users - Weights relation
User.hasMany(Weight)
Weight.belongsTo(User);
