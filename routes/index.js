const express = require('express');
const authRoutes = require('./authRoutes.js');
const orderRoutes = require('./orderRoutes.js');
const staffRoutes = require('./staffRoutes.js');
const foodItemRoutes = require('./foodItemRoutes.js');
const mainRoutes = require('./mainRoutes.js');
const { checkUser } = require('../controllers/authContoller.js');


const router = express.Router();
router.use(authRoutes);

// authentication check
router.use((req, res, next) => {

    console.log('cookie:', req.cookies);
    if (req.session.loggedIn) {
        next();
    } else {
        res.redirect('/login');
    }
});

router.use('/orders', orderRoutes);
router.use('/staff', checkUser('staff', '/'), staffRoutes);
router.use('/staff/food-items', checkUser('staff', '/'), foodItemRoutes);
router.use(checkUser('customer', '/staff'), mainRoutes);

module.exports = router;