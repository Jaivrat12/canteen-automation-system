const express = require('express');
const { Employee } = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {

    const employees = await Employee.findAll();
    res.render('staff/employees/view', {
        isAdmin: req.session.isAdmin,
        employees
    });
});

router.get('/add', async (req, res) => {
    res.render('staff/employees/add', { isAdmin: req.session.isAdmin });
});

router.post('/add', async (req, res) => {

    try {
        const employee = await Employee.create(req.body);
        await employee.save();
    } catch (err) {
        console.log(err);
    }
    res.redirect('/staff/employees');
});

router.get('/:id/edit', async (req, res) => {

    const id = req.params.id;

    // handle condition where id is Not A Number
    if (Number(id) !== NaN) {

        const employee = await Employee.findByPk(id);
        if (employee) {

            res.render('staff/employees/edit', {
                isAdmin: req.session.isAdmin,
                employee
            });
            return;
        }
    }

    res.send('Requested resource is unavailable');
});

router.post('/:id/edit', async (req, res) => {

    const id = req.params.id;
    const updates = req.body;
    updates.isAdmin = Boolean(updates.isAdmin);

    await Employee.update(updates, { where: { id: id } });
    res.redirect('/staff/employees');
});

router.get('/:id/delete', async (req, res) => {

    const id = req.params.id;
    await Employee.destroy({ where: { id: id } });
    res.redirect('/staff/employees');
});

module.exports = router;