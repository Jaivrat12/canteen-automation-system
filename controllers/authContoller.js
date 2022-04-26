const { Customer, Employee } = require('../models/index.js');

async function loginGet(req, res) {

    const isStaff = req.url.includes('staff');
    res.render('login', { error: false, isStaff });
}

async function loginPost(req, res) {

    const email = req.body.email;
    const password = req.body.password;

    const isStaff = req.url.includes('staff');
    let user = isStaff ? {
        model: Employee,
        userType: 'staff'
    } : {
        model: Customer,
        userType: 'customer'
    };

    user.data = await user.model.findOne({ where: { email: email } });
    if (user.data && user.data.password == password) {

        req.session.loggedIn = true;
        req.session.userId = user.data.id;
        req.session.userType = user.userType;
        req.session.isAdmin = user.data.isAdmin;

        const redirect = isStaff ? '/staff/' : '/';
        res.redirect(redirect);
    } else {
        res.render('login', { error: true, isStaff });
    }
}

async function logoutGet(req, res) {

    if (req.session.loggedIn) {

        const redirect = req.session.userType === 'staff' ? '/staff' : '';
        req.session.destroy(() => {
            res.redirect(redirect + '/login');
        });
    } else {
        res.redirect('/');
    }
}

function authCheck(req, res, next) {

    console.log('cookie:', req.cookies);
    if (req.session.loggedIn) {
        next();
    } else {
        res.redirect('/login');
    }
}

function checkUser(userType, redirect) {

    return (req, res, next) => {

        if (userType === 'admin' && req.session.isAdmin) {
            next();
        }
        else if (req.session.userType === userType) {
            next();
        } else {
            res.redirect(redirect);
        }
    };
}

module.exports = {
    loginGet, loginPost, logoutGet,
    authCheck, checkUser
};