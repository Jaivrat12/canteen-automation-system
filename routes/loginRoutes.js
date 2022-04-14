const express = require('express');
const { loginPost } = require('../controllers/loginContoller');
const router = express.Router();

router.post('/login', loginPost);

module.exports = router;