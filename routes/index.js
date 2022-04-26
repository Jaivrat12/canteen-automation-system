const express = require('express');
const authRoutes = require('./authRoutes.js');
const { authCheck, checkUser } = require('../controllers/authContoller.js');
const orderRoutes = require('./orderRoutes.js');
const staffRoutes = require('./staffRoutes.js');
const foodItemRoutes = require('./foodItemRoutes.js');
const empRoutes = require('./empRoutes.js');
const customerRoutes = require('./customerRoutes.js');
const mainRoutes = require('./mainRoutes.js');


const router = express.Router();

router.use(authRoutes);
router.use(authCheck);              // authentication check

router.use('/orders', orderRoutes);
router.use('/staff', checkUser('staff', '/'), staffRoutes);
router.use('/staff/food-items', checkUser('staff', '/'), foodItemRoutes);
router.use('/staff/employees', checkUser('admin', '/staff'), empRoutes);
router.use('/staff/customers', checkUser('admin', '/staff'), customerRoutes);
router.use(checkUser('customer', '/staff'), mainRoutes);

module.exports = router;