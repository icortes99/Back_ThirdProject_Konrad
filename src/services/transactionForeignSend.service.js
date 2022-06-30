const sequelize = require('../helpers/connection.helper')
const TransactionForeignSend = require('../models/transactionForeignSend.model')

class TransactionForeignSendService{
    static async getForeignSendTransactions(){
        const foreignSendTransactions = await TransactionForeignSend.findAll()
        return foreignSendTransactions
    }

    static async getForeignSendTransactionsUser(inIdUser){
        const foreignSendTransactions = await TransactionForeignSend.findAll({ where: {sender: inIdUser}})
        return foreignSendTransactions
    }

    static async addForeignSendTransactions(newForeignSendTransactions){
        const foreignSendTransactions = await TransactionForeignSend.create(newForeignSendTransactions)
        return foreignSendTransactions
    }
}

module.exports = TransactionForeignSendService