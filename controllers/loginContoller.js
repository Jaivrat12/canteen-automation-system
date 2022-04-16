const { Customer } = require('../models/index.js');

async function loginGet(req, res) {
    res.render('login', {error: false});
}

async function loginPost(req, res) {

    const email = req.body.email;
    const password = req.body.password;
    const cus = await Customer.findOne({ where: { email: email } });

    if (cus && cus.password == password) {
        res.redirect('/');
    } else {
        res.render('login', {error: true});
    }
}

module.exports = { 
    loginGet,
    loginPost
 };