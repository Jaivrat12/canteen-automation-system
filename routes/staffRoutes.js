const express = require('express');
const { Order } = require('../models/index.js');


const router = express.Router();

router.get('/', (req, res) => {
    res.redirect('/staff/active-orders');
});

router.get('/active-orders', async (req, res) => {

    const activeOrders = await Order.findAll({
        where: {
            status: ['accepted', 'pending', 'preparing', 'completed']
        },
        order: [
            ['updated_at', 'DESC'],
        ],
        include: ['customer', 'food_items']
    });

    for (let i = 0; i < activeOrders.length; i++) {

        const items = [];
        for (let j = 0; j < activeOrders[i].food_items.length; j++) {
            items.push(activeOrders[i].food_items[j].name);
        }
        activeOrders[i].items = items.join(', ');
    }

    res.render('staff/active-orders', {
        isAdmin: req.session.isAdmin,
        orders: activeOrders
    });
});

router.get('/active-orders/:id', async (req, res) => {

    const id = req.params.id;
    const activeOrder = await Order.findByPk(id, {
        include: ['customer', 'food_items']
    });

    activeOrder.items = activeOrder.food_items;
    for (let i = 0; i < activeOrder.items.length; i++) {
        activeOrder.items[i].quantity = activeOrder.food_items[i].order_food_items.quantity;
    }

    res.render('staff/active-order', {
        isAdmin: req.session.isAdmin,
        order: activeOrder
    });
});

router.get('/order-history', async (req, res) => {

    const orders = await Order.findAll({
        where: { status: ['rejected', 'delivered'] },
        order: [ ['updated_at', 'DESC'] ],
        include: ['customer', 'food_items']
    })

    for (let j = 0; j < orders.length; j++) {

        orders[j].items = orders[j].food_items;
        for (let i = 0; i < orders[j].items.length; i++) {
            orders[j].items[i].quantity = orders[j].food_items[i].order_food_items.quantity;
        }
    }

    res.render('staff/order-history', {
        isAdmin: req.session.isAdmin,
        orders
    });
});


module.exports = router;