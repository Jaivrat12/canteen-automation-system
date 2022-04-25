const express = require('express');
const cloudinary = require('cloudinary').v2;
const { FoodItem } = require('../models/index.js');


const router = express.Router();

router.get('/', async (req, res) => {

    const items = await FoodItem.findAll();
    res.render('staff/food-items/view', { items });
});

router.get('/add', async (req, res) => {
    res.render('staff/food-items/add');
});

// router.get('/:id', async (req, res) => {

//     const id = req.params.id;
//     const item = await FoodItem.findByPk(id);
//     res.render('staff/food-item', { item });
// });

router.post('/add', async (req, res) => {

    try {

        const newItem = await FoodItem.create(req.body);
        const result = await cloudinary.uploader.upload(
            req.files.image.tempFilePath, {
                public_id: newItem.id
            }
        );
        newItem.image = result.secure_url;
        await newItem.save();
    } catch (err) {
        console.log(err);
    }
    res.redirect('/staff/food-items');
});

router.get('/:id/edit', async (req, res) => {

    const id = req.params.id;

    // handle condition where id is Not A Number
    if (Number(id) !== NaN) {

        const item = await FoodItem.findByPk(id);
        if (item) {

            res.render('staff/food-items/edit', { item });
            return;
        }
    }
    res.send('Requested resource is unavailable');
});

router.post('/:id/edit', async (req, res) => {

    const id = req.params.id;
    const updates = req.body;
    updates.isAvailable = Boolean(updates.isAvailable);

    if (req.files?.image) {

        updates.image = (await cloudinary.uploader.upload(
            req.files.image.tempFilePath, {
                public_id: id
            }
        )).secure_url;
    }

    await FoodItem.update(updates, { where: { id: id } });
    res.redirect('/staff/food-items');
});

router.get('/:id/delete', async (req, res) => {

    const id = req.params.id;
    await FoodItem.destroy({ where: { id: id } });
    await cloudinary.api.delete_resources([id]);
    res.redirect('/staff/food-items');
});

module.exports = router;