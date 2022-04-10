const Sequelize = require('sequelize');
const db = require('../config/database.js');

const FoodItem = db.define('food_item', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    price: {
        type: Sequelize.DECIMAL(6, 2),
        allowNull: false
    },
});

module.exports = FoodItem;