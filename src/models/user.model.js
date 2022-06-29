const Sequelize = require('sequelize')
const sequelize = require('../helpers/connection.helper')

const UserSchema = sequelize.define('user', {
    idUser: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    incomeSource: {
        type: Sequelize.STRING,
        allowNull: false
    },
    photo: {
        type: Sequelize.STRING,
        allowNull: true
    }
})

module.exports = UserSchema