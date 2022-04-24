const { DataTypes } = require('sequelize');
const myTypes = require('./myTypes.js');
const db = require('../config/database.js');

const Order = db.define('order', {

    id: myTypes.id,
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    status: {
        ...(myTypes.text()),
        defaultValue: 'pending'
    },
    token: DataTypes.STRING,
    estPrepTime: DataTypes.TIME
}, {
    underscored: true
});

module.exports = Order;