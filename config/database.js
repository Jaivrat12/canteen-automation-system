const { Sequelize } = require('sequelize');

const db = new Sequelize('postgres', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: false
});

module.exports = db;