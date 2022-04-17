const express = require('express');
const { FoodItem, Notification, Order } = require('../models');

const router = express.Router();

router.get('/',  async(req, res) => {
    const items = await FoodItem.findAll();
    res.render('home', {items});
});

router.get('/alerts', async(req, res) => {
    const notifications = await Notification.findAll({where: {customerId: req.session.userId}});
    res.render('notification', {notifications}); 
});

router.get('/cart', async(req, res) => {

});

router.post('/cart', async(req, res) => {

});

router.get('/active-orders', async(req, res) => {
    const activeOrders = await Order.findAll({
        where: {
            customerId: req.session.userId,
            status: ['accepted', 'pending', 'preparing', 'complete']
        },
        include: 'food_items'

    })
    console.log(activeOrders[0].toJSON());
    console.log(activeOrders[0].food_items[0].toJSON());
});

module.exports = router;