const Sequelize = require('sequelize')
const sequelize = require('../helpers/connection.helper')

const TransactionForeignReceive = sequelize.define('transactionForeignReceive', {
    idTransaction: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    sender: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    senderAccount: {
        type: Sequelize.BIGINT,
        allowNull: false
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

module.exports = TransactionForeignReceive