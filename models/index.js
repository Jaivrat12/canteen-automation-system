const Customer = require('./customer.js');
const Notification = require('./notification.js');
const Order = require('./order.js');
const FoodItem = require('./foodItem.js');
const OrderFoodItems = require('./orderFoodItems.js');
const Employee = require('./employee.js');

// Customer & Notification have one-to-many relationship
Customer.hasMany(Notification, {
    foreignKey: {
        allowNull: false
    }
});
Notification.belongsTo(Customer);

// Customer & Order have one-to-many relationship
Customer.hasMany(Order, {
    foreignKey: {
        allowNull: false
    }
});
Order.belongsTo(Customer);

// Order & FoodItem have many-to-many relationship
Order.belongsToMany(FoodItem, { through: OrderFoodItems });
FoodItem.belongsToMany(Order, { through: OrderFoodItems });

const models = {
    Employee, Customer, FoodItem,
    Order, Notification
};

module.exports = models;