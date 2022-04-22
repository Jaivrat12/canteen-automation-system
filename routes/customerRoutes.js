const express = require('express');
const { FoodItem, Notification, Order } = require('../models');

const router = express.Router();

router.get('/',  async(req, res) => {
    let cart = req.cookies.cart;
    if(cart){
         cart = JSON.parse(cart);
    }else{
        cart = [];
    }
    const cartItemIds = [];
    cart.forEach((item) => {
        cartItemIds.push(Number(item.id));
    })

    const items = await FoodItem.findAll();
    for (let i = 0; i < items.length; i++) {
        const index = cartItemIds.indexOf(items[i].id);
        if (index !== -1) {
            items[i].quantity = cart[index].quantity;
        }
    }
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
        total: total,
        customerId: req.session.userId 
    });

    items.forEach(async (item) => {
        await order.addFood_items(item, {through: {quantity: item.quantity}})
    });

    res.cookie('cart', '');

    res.redirect('/track-order/' + order.id);
});

router.get('/active-orders', async(req, res) => {

    const activeOrders = await Order.findAll({
        where: {
            customerId: req.session.userId, 
            status: ['accepted', 'pending', 'preparing', 'complete']
        },
        include: 'food_items'

    }) 
  
    for(let i = 0; i < activeOrders.length; i++){
        const items = [];
        for(let j = 0; j < activeOrders[i].food_items.length; j++){  
            items.push(activeOrders[i].food_items[j].name);
         }
        activeOrders[i].items = items.join(',');
    }
    res.render('active-orders',{orders: activeOrders});
});

router.get('/track-order/:id', async(req, res) => {
    const id = req.params.id;
    const order = await Order.findByPk(id, {
        include: 'food_items'
    });
    order.items = order.food_items;
    for(let i = 0; i < order.items.length; i++){
        order.items[i].quantity = order.food_items[i].order_food_items.quantity;
    }
    res.render('track-order',{order});
});

router.get('/order-history', async(req, res) => {
    const orders = await Order.findAll({
        where: {
            customerId: req.session.userId,
            status: ['delivered', 'rejected']
        },
        include: 'food_items'
    })

    for(let j = 0; j < orders.length; j++){
        orders[j].items = orders[j].food_items;
        for(let i = 0; i < orders[j].items.length; i++){
            orders[j].items[i].quantity = orders[j].food_items[i].order_food_items.quantity;
        }
    }
    res.render('order-history',{orders});
})


module.exports = router;