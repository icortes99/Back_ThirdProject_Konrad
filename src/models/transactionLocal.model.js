const Sequelize = require('sequelize')
const sequelize = require('../helpers/connection.helper')

const TransactionLocalSchema = sequelize.define('transactionLocal', {
    idTransaction: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    amount: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    transactionDate: {
        type: Sequelize.DATE(6), //up to 6 digits of precision
        allowNull: false
    }
})

module.exports = TransactionLocalSchema