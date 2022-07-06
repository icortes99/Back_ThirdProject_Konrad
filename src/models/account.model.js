const Sequelize = require('sequelize')
const sequelize = require('../helpers/connection.helper')

const AccountSchema = sequelize.define('account', {
    accountNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    accountBalance: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
})

module.exports = AccountSchema