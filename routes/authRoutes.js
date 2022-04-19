const express = require('express');
const { loginPost, loginGet, logoutGet } = require('../controllers/authContoller.js');
const router = express.Router();

// customer login
router.get('/login', loginGet);
router.post('/login', loginPost);

// staff login
router.get('/staff/login', loginGet);
router.post('/staff/login', loginPost);

// logout
router.get('/logout', logoutGet);

module.exports = router;