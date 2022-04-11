const Sequelize = require('sequelize');
const db = require('../config/database.js');

const Customer = db.define('customer', {
    id: {
        type: Sequelize.TEXT,
        primaryKey: true
    },
    name: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    email: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    phone: {
        type: Sequelize.DECIMAL(10),
        allowNull: false
    },
    role: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    department: {
        type: Sequelize.TEXT
    }
});

module.exports = Customer;