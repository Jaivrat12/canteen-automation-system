const { Sequelize } = require('sequelize');

const options = {
    logging: false
};

if (process.env.NODE_ENV === 'production') {
    options.dialectOptions = { ssl: {
        require: true,
        rejectUnauthorized: false
    } };
}

const db = new Sequelize(process.env.DATABASE_URL, options);

module.exports = db;