const express = require('express');
const { Customer } = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {

    const customers = await Customer.findAll();
    res.render('staff/customers/view', {
        isAdmin: req.session.isAdmin,
        customers
    });
});

router.get('/add', async (req, res) => {
    res.render('staff/customers/add', { isAdmin: req.session.isAdmin });
});

router.post('/add', async (req, res) => {

    try {
        const customer = await Customer.create(req.body);
        await customer.save();
    } catch (err) {
        console.log(err);
    }
    res.redirect('/staff/customers');
});

router.get('/:id/edit', async (req, res) => {

    const id = req.params.id;

    // handle condition where id is Not A Number
    if (Number(id) !== NaN) {

        const customer = await Customer.findByPk(id);
        if (customer) {

            res.render('staff/customers/edit', {
                isAdmin: req.session.isAdmin,
                customer
            });
            return;
        }
    }
    res.send('Requested resource is unavailable');
});

router.post('/:id/edit', async (req, res) => {

    const id = req.params.id;
    const updates = req.body;

    await Customer.update(updates, { where: { id: id } });
    res.redirect('/staff/customers');
});

router.get('/:id/delete', async (req, res) => {

    const id = req.params.id;
    await Customer.destroy({ where: { id: id } });

    res.redirect('/staff/customers');
});

module.exports = router;