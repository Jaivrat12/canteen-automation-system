const express = require('express');
const { loginPost, loginGet, logoutPost } = require('../controllers/authContoller.js');
const router = express.Router();

router.get('/login', loginGet);
router.post('/login', loginPost);
router.post('/logout', logoutPost);

module.exports = router;