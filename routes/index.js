const express = require('express');
const authRoutes = require('./authRoutes.js');
const staffRoutes = require('./staffRoutes.js');
const orderRoutes = require('./orderRoutes.js');
const customerRoutes = require('./customerRoutes.js');
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
router.use(checkUser('customer', '/staff'), customerRoutes);

module.exports = router;