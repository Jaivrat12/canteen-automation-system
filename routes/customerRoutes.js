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

    const cart = {
        items: [
            { id: 1, name: 'abc', price: 123, quantity: 1 },
            { id: 2, name: 'abc1', price: 124, quantity: 2 },
            { id: 3, name: 'abc2', price: 125, quantity: 3 },
        ],
        total: 12345
    };
    res.render('cart', cart);
});

router.post('/cart', async(req, res) => {

    res.redirect('/');
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
    const orders = {
        orders: [
            { id: 1, name: 'abc', items: 'item1, item2, item3', total: 300 },
            { id: 2, name: 'abc1', items: 'item1, item2, item3', total: 400 },
            { id: 3, name: 'abc2', items: 'item1, item2, item3', total: 600 },
        ]
    };
    res.render('active-orders', orders);
});

module.exports = router;