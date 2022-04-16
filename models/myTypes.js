const { DataTypes } = require('sequelize');

const myTypes = {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    text: (allowNull = false) => ({
        type: DataTypes.TEXT,
        allowNull: allowNull
    }),
    email: (unique = true) => ({
        type: DataTypes.STRING(254),
        allowNull: false,
        unique: unique,
        validate: {
            isEmail: true
        }
    }),
    password: {
        type: DataTypes.STRING(128),
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING(32),
        allowNull: false
    },
};

module.exports = myTypes;