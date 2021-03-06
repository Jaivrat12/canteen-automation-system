const { DataTypes } = require('sequelize');
const myTypes = require('./myTypes.js');
const db = require('../config/database.js');

const Customer = db.define('customer', {

    id: myTypes.id,
    name: myTypes.text(),
    email: myTypes.email('customers_email_key'),
    password: myTypes.password,
    phone: myTypes.phone,
    role: myTypes.text(),
    department: DataTypes.TEXT
}, {
    timestamps: false,
    underscored: true
});

module.exports = Customer;