// import modules
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const db = require('./config/database.js');
const authRoutes = require('./routes/authRoutes.js');
const menuRoutes = require('./routes/menuRoutes.js');


// creating an express app for the server
const app = express();                  // returns an app object


// app setup
// app.set('trust proxy', 1)            // trust first proxy
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


// app routing
app.use(authRoutes);

// auth check
app.use((req, res, next) => {

    console.log('cookie:', req.cookies);
    if (req.session.loggedIn) {
        next();
    } else {
        res.redirect('/login');
    }
});

app.get('/', (req, res) => {
    res.send('<a href="/menu">Go to Menu</a>');
});

app.use('/menu', menuRoutes);           // handle all menu routes