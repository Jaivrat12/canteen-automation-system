const express = require('express');
const { itemsGet, itemGet, itemPost } = require('../controllers/foodItemControllers.js');
const router = express.Router();

router.get('/', itemsGet);
router.get('/:id', itemGet);
router.post('/', itemPost);

module.exports = router;
