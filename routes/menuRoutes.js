const express = require('express');
const FoodItem = require('../models/FoodItem.js');

// create new router object to handle requests
const router = express.Router();                // router to handle all requests to `/menu`


// defining route handlers for `/menu`

// get all items
router.get('/', async (req, res) => {                 // route handler for `GET` requests to route `/menu/`

    const items = await FoodItem.findAll();
    res.render('index', { items: items });
});

// get specific item by id
router.get('/:id', async (req, res) => {              // route handler for `GET` requests to route `/menu/id`

    const id = req.params.id;
    const item = await FoodItem.findByPk(id);
    res.render('item', { item: item });
});

// add/create a new item
router.post('/', async (req, res) => {                // route handler for `POST` requests to route `/menu/`

    const newItem = await FoodItem.create({
        name: req.body.name,
        price: req.body.price,
    });
    res.redirect(`/menu/${ newItem.id }`);
});

// update an item by id
// or use `/:id/edit`
router.post('/:id/edit', async (req, res) => {              // route handler for `PUT` requests to route `/menu/id`

    // Still not final!!!
    // const id = req.params.id;
    // const updates = req.body;
    // await FoodItem.update(updates, { where: { id: id } });
    // res.redirect(`/menu/${ id }`);
});

// delete an item by id
// or use `/:id/delete`
router.post('/:id/delete', async (req, res) => {           // route handler for `DELETE` requests to route `/menu/id`

    const id = req.params.id;
    await FoodItem.destroy({ where: { id: id } });
    res.redirect('/menu');
});

module.exports = router;