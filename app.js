// import modules
const express = require('express');
const db = require('./config/database.js');
const menuRoutes = require('./routes/menuRoutes.js');


// creating an express app for the server
const app = express();                  // returns an app object


// app setup
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
app.get('/', (req, res) => {
    res.send('<a href="/menu">Go to Menu</a>');
});

app.use('/menu', menuRoutes);           // handle all menu routes