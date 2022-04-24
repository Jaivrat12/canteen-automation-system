const { DataTypes } = require('sequelize');
const myTypes = require('./myTypes.js');
const db = require('../config/database.js');
const Order = require('./order.js');
const FoodItem = require('./foodItem.js');

const OrderFoodItems = db.define('order_food_items', {

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
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1
        }
    }
}, {
    timestamps: false,
    underscored: true
});

module.exports = OrderFoodItems;