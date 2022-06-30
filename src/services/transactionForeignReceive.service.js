const sequelize = require('../helpers/connection.helper')
const TransactionForeignReceive = require('../models/transactionForeignReceive.model')

class TransactionForeignReceiveService{
    static async getForeignReceivedTransactions(){
        const foreignReceivedTransactions = await TransactionForeignReceive.findAll()
        return foreignReceivedTransactions
    }

    static async getForeignReceivedTransactionsUser(inIdUser){
        const foreignReceivedTransactions = await TransactionForeignReceive.findAll({ where: {receiver: inIdUser}})
        return foreignReceivedTransactions
    }

    static async addForeignReceivedTransactions(newForeignSendTransactions){
        const foreignReceivedTransactions = await TransactionForeignReceive.create(newForeignSendTransactions)
        return foreignReceivedTransactions
    }
}

module.exports = TransactionForeignReceiveService