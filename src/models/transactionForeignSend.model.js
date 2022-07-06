const Sequelize = require('sequelize')
const sequelize = require('../helpers/connection.helper')

const TransactionForeignSend = sequelize.define('transactionForeignSend', {
    idTransaction: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    receiver: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    receiverAccount: {
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
    },
    description: { //this is to storage service payments, allow null to difference between transact and bill
        type: Sequelize.STRING,
        allowNull: true
    }
})

module.exports = TransactionForeignSend