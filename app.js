const express = require('express');
const path = require('path');
const { database} = require('./config');
const sequelize = require('./models/index');
const user = require('./models/user');
require('./models/Weight');
require('./models/Associations');
const passport = require('passport');
const session = require('express-session');
const MariaDBStore = require('express-session-mariadb-store');
const bodyParser = require('body-parser');
const flash = require('connect-flash');

// INITIALIZATIONS
const app = express();
sequelize.sync( {force: false }).then(async () => {
    console.log("Conectado a la base de datos!");
}).catch(error => {
    console.log("Se ha producido un error!", error);
}); 
require('./helpers/passport');


// SETTINGS
// Set static path to serve static files
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
    extended: true
}));

// TEMPLATE ENGINE
// Set Pug Template Engine
// Set directory where the template files are located
app.set('views', './views');
// Set template engine to use
app.set('view engine', 'pug');

// MIDDLEWARES
app.use(express.urlencoded({extended:false}));
app.use(session({
    secret: 'pluslearnsession',
    resave: false,
    saveUninitialized: false,
    store: new MariaDBStore(database)
}));
app.use(flash());
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

// GLOBAL VARIABLES
app.use((req,res,next) => {
    res.locals.messages = req.flash("Message");
    res.locals.successes = req.flash("Success");
    app.locals.user = req.user;
    next();
});

// ROUTES
app.use(require('./routes'));
app.use(require('./routes/index'));
app.use(require('./routes/auth'));


module.exports = app;