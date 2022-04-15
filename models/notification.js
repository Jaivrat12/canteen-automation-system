const { DataTypes } = require('sequelize');
const myTypes = require('./myTypes.js');
const db = require('../config/database.js');

const Notification = db.define('notification', {

    id: myTypes.id,
    title: myTypes.text(),
    body: myTypes.text()
}, {
    timestamps: false,
    underscored: true
});

module.exports = Notification;