// import modules
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const db = require('./config/database.js');
const routes = require('./routes/index.js');


// creating an express app for the server
const app = express();                  // returns an app object

// app setup
app.use(session({                       // using express-session middleware
    secret: 'some secret lol',
    resave: true,
    saveUninitialized: false,
    // unset: 'destroy',
    cookie: {
        // secure: true,
        maxAge: 30 * 24 * 60 * 60 * 1000
    }
}));
app.use(cookieParser());
app.set('view engine', 'ejs');          // set view engine to `ejs`
// `app.use()` is used to register middlewares
app.use(express.static('public'));      // use `public` folder for hosting static files
// `express.static()` is a middleware to host static files
app.use(express.urlencoded({            // parses urlencoded payloads like form data
    extended: true                      // to support rich object syntax (nested object)
}));

// setting up connection to database
db.authenticate();
db.sync({ alter: true }).then(() => {

    // listening for requests on a port
    const PORT = 3000;
    app.listen(PORT, () => console.log(`listening on port ${ PORT }`));
});

// this middleware is just for dev purposes
// it allows you to choose a userType at the start without having to login
app.use((req, res, next) => {

    // next(); return;
    const admin = { userId: 1, userType: 'staff', isAdmin: true };
    const manager = { userId: 2, userType: 'staff', isAdmin: false };
    const customer = { userId: 1, userType: 'customer' };
    const user = manager;

    if (!req.session.loggedIn) {

        req.session.loggedIn = true;
        req.session.userId = user.userId;
        req.session.userType = user.userType;
        req.session.isAdmin = user.isAdmin;
    }
    next();
});

// app routing
app.use(routes);