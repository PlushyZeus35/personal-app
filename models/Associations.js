const User = require('./user');
const Weight = require('./Weight');
const Binance = require('./Binance');
const CriptoData = require('./CriptoData');
const Birthday = require('./Birthday');
const Book = require('./Book');
const Task = require('./Task');
const Buy = require('./Buy');
const Product = require('./Product');
const Shop = require('./Shop');
const Ticket = require('./Ticket');

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

// Users - Books relation
User.hasMany(Book);
Book.belongsTo(User);

// Users - Tasks relation
User.hasMany(Task);
Task.belongsTo(User);

Shop.hasMany(Product);
Product.belongsTo(Shop);

User.hasMany(Buy);
Buy.belongsTo(User);

Product.hasMany(Buy);

User.hasMany(Ticket);
Ticket.belongsTo(User);

Ticket.hasMany(Buy);
Buy.belongsTo(Ticket);