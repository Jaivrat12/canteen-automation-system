const { DataTypes } = require('sequelize');
const myTypes = require('./myTypes.js');
const db = require('../config/database.js');

const Employee = db.define('employee', {

    id: myTypes.id,
    name: myTypes.text(),
    email: myTypes.email('staff_email_key'),
    password: myTypes.password,
    phone: myTypes.phone,
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
}, {
    timestamps: false,
    underscored: true
});

module.exports = Employee;