const express = require('express');
const { checkUser } = require('../controllers/authContoller.js');
const { Order, Notification } = require('../models/index.js');

const router = express.Router();

function getNotificationContent(status) {

    let title, body;

    switch (status) {

        case 'pending': {
            title = 'Order pending';
            body = 'Your order is in waiting period';
            break;
        }
        case 'accepted': {
            title = 'Order accepted!';
            body = 'Your order has been accepted!';
            break;
        }
        case 'rejected': {
            title = 'Order rejected!';
            body = 'Your order has been rejected!';
            break;
        }
        case 'preparing': {
            title = 'Preparation started!';
            body = 'Your food is being prepared';
            break;
        }
        case 'completed': {
            title = 'Preparation completed!';
            body = 'Your order has been prepared, please come to the counter to receive it';
            break;
        }
        case 'delivered': {
            title = 'Order delivered!';
            body = 'Your order has been delivered to you!';
            break;
        }
    }
    return { title, body};
}

function notifyClient(notification, customerId) {}

router.post('/:id/update', checkUser('staff', '/staff/login'), async (req, res) => {

    if (req.session.userType === 'staff') {

        const id = req.params.id;
        // console.log(id);
        const order = await Order.findByPk(id);

        // const activeStatus = ['pending', 'accepted', 'preparing', 'completed'];
        const status = req.body.status;
        if (status !== order.status/*  && activeStatus.includes(order.status) */) {

            order.status = status;
            await order.save();

            const { title, body } = getNotificationContent(order.status);
            const href = '/track-order/' + id;
            const notification = await Notification.create({
                title, body, href,
                customerId: order.customerId
            });

            notifyClient(notification, order.customerId);
        }
    }

    res.redirect(req.url);
});

module.exports = router;