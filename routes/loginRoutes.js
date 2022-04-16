const express = require('express');
const { loginPost, loginGet } = require('../controllers/loginContoller');
const router = express.Router();

router.get('/login', loginGet);

router.post('/login', loginPost);


module.exports = router;