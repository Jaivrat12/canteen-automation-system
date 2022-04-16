const { DataTypes } = require('sequelize');
const myTypes = require('./myTypes.js');
const db = require('../config/database.js');
const Order = require('./order.js');
const FoodItem = require('./foodItem.js');

const OrderFoodItems = db.define('order_food_items', {

    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    orderId: {
        type: myTypes.id.type,
        references: {
            model: Order,
            key: 'id'
        },
        allowNull: false
    },
    foodItemId: {
        type: myTypes.id.type,
        references: {
            model: FoodItem,
            key: 'id'
        },
        allowNull: false
    }
}, {
    timestamps: false,
    underscored: true
});

module.exports = OrderFoodItems;