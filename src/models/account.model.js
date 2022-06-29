const Sequelize = require('sequelize')
const sequelize = require('../helpers/connection.helper')

const AccountSchema = sequelize.define('account', {
    accountNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    currency: {
        type: Sequelize.STRING,
        allowNull: false
    },
    accountBalance: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
})

module.exports = AccountSchema