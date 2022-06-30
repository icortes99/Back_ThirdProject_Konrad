const express = require('express')
const TransactionLocalService = require('../services/transactionLocal.service')
const transactionLocalRouter = express.Router()
const {isValidationError, formatRequestError} = require('../helpers/error.helper')

transactionLocalRouter
.route('/')
.get(async (req, res)=>{
    const listLocalTransactions = await TransactionLocalService.getAllLocalTransactions()
    res.json(listLocalTransactions)
})
.post(async (req, res)=>{
    const localTransactionInfo = req.body

    try {
        const obj = await TransactionLocalService.addLocalTransaction(localTransactionInfo)
        obj !== null ? res.send(obj) : res.sendStatus(404)
    } catch (err) {
        res
        .status(isValidationError(err) ? 400 : 500)
        .send(formatRequestError(err))
    }
})

currencyRouter
.route('/sender/:id')
.get(async (req, res)=>{
    const senderID = req.params.id
    const process = await TransactionLocalService.getAllLocalTransactionsSent(senderID)
    res.json(process)
})

currencyRouter
.route('/receiver/:id')
.get(async (req, res)=>{
    const receiverID = req.params.id
    const process = await TransactionLocalService.getAllLocalTransactionsReceived(receiverID)
    res.json(process)
})

currencyRouter
.route('/:id')
.get(async (req, res)=>{
    const userID = req.params.id
    const process = await TransactionLocalService.getAllLocalTransactions(userID)
    res.json(process)
})

module.exports = currencyRouter