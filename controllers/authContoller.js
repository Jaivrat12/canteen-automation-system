const { Customer } = require('../models/index.js');

async function loginGet(req, res) {
    res.render('login', { error: false });
}

async function loginPost(req, res) {

    const email = req.body.email;
    const password = req.body.password;
    const cus = await Customer.findOne({ where: { email: email } });

    if (cus && cus.password == password) {

        req.session.loggedIn = true;
        req.session.userType = 'customer';
        req.session.userId = cus.id;
        res.redirect('/active-orders');
    } else {
        res.render('login', { error: true });
    }
}

async function logoutPost(req, res) {

    req.session.destroy(() => {
        res.redirect('/');
    });
}

module.exports = {
    loginGet,
    loginPost,
    logoutPost
};