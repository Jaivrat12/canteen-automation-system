const { DataTypes } = require('sequelize');
const myTypes = require('./myTypes.js');
const db = require('../config/database.js');

const FoodItem = db.define('food_item', {

    id: myTypes.id,
    name: myTypes.text(),
    price: {
        type: DataTypes.DECIMAL(6, 2),
        allowNull: false
    },
    category: myTypes.text(),
    isAvailable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },
    image: DataTypes.BLOB,
    description: DataTypes.TEXT,
    prepTime: DataTypes.TIME
}, {
    timestamps: false,
    underscored: true
});

module.exports = FoodItem;