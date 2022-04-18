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

    const cart = JSON.parse(req.cookies.cart);

    const itemIds = [];
    cart.forEach((item) => {
        itemIds.push(item.id);
    })

    const items = await FoodItem.findAll({
        where: {
            id: itemIds
        }
    });

    let total = 0;
    for (let i = 0; i < items.length; i++) {

        items[i].quantity = cart[i].quantity;
        total += Number(items[i].price) * cart[i].quantity;
    };

    res.render('cart', { items, total });
});

router.post('/cart', async(req, res) => {

    const cart = JSON.parse(req.cookies.cart);

    const itemIds = [];
    cart.forEach((item) => {
        itemIds.push(item.id);
    })

    const items = await FoodItem.findAll({
        where: {
            id: itemIds
        }
    });

    let total = 0;
    for (let i = 0; i < items.length; i++) {

        items[i].quantity = cart[i].quantity;
        total += Number(items[i].price) * cart[i].quantity;
    };

    const order = await Order.create({
        status: 'pending',
        customerId: req.session.userId
    });

    items.forEach(async (item) => {
        await order.addFood_items(item, {through: {quantity: item.quantity}})
    });

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