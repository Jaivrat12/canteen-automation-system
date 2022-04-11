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
    category: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    isAvailable: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    image: {
        type: Sequelize.TEXT
    },
    description: {
        type: Sequelize.TEXT
    },
    prepTime: {
        type: Sequelize.TIME
    }
});

module.exports = FoodItem;