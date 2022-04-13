const Customer = require('../models/customer');

async function loginPost(req, res) {

    const email = req.body.email;
    const password = req.body.password;
    const cus = await Customer.findOne({ where: { email: email } });

    if (cus && cus.password == password) {
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
}

module.exports = { loginPost: loginPost };