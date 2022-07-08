const sequelize = require('../helpers/connection.helper')
const TransactionLocalSchema = require('../models/transactionLocal.model')

class TransactionLocalService{
    static async getAllLocalTransactions(){
        const localTransactions = await TransactionLocalSchema.findAll()
        return localTransactions
    }

    static async getAllLocalTransactionsSent(inIdUser){
        const localTransactionsSent = await TransactionLocalSchema.findAll({ where: {sender: inIdUser}})
        return localTransactionsSent
    }

    static async getAllLocalTransactionsReceived(inIdUser){
        const localTransactionsReceived = await TransactionLocalSchema.findAll({ where: {receiver: inIdUser}})
        return localTransactionsReceived
    }

    static async getAllLocalTransactionsUser(inIdUser){
        const localTransactionsReceived = await TransactionLocalSchema.findAll({ where: {receiver: inIdUser}})
        const localTransactionsSent = await TransactionLocalSchema.findAll({ where: {sender: inIdUser}})
        const allLocalTransactions = []
        allLocalTransactions.push(localTransactionsReceived)
        allLocalTransactions.push(localTransactionsSent)
        return allLocalTransactions
    }

    static async addLocalTransaction(newLocalTransactionInfo){
        const newLocalTransaction = await TransactionLocalSchema.create(newLocalTransactionInfo)
        return newLocalTransaction
    }
}

module.exports = TransactionLocalService