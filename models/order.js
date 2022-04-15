const { DataTypes } = require('sequelize');
const myTypes = require('./myTypes.js');
const db = require('../config/database.js');

const Order = db.define('order', {

    id: myTypes.id,
    status: myTypes.text(),
    token: DataTypes.STRING,
    estPrepTime: DataTypes.TIME
}, {
    timestamps: false,
    underscored: true
});

module.exports = Order;