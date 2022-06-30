const express = require('express')
const TransactionLocalService = require('../services/transactionLocal.service')
const TransactionForeignReceiveService = require('../services/transactionForeignReceive.service')
const TransactionForeignSendService = require('../services/transactionForeignSend.service')
const transactionsRouter = express.Router()
const {isValidationError, formatRequestError} = require('../helpers/error.helper')

/*********** Local transactions ***********/
/***** All transactions in table *****/
transactionsRouter
.route('/local')
.get(async (req, res)=>{
    try {
        const listLocalTransactions = await TransactionLocalService.getAllLocalTransactions()
        res.json(listLocalTransactions)
    } catch (err) {
        res
        .status(isValidationError(err) ? 400 : 500)
        .send(formatRequestError(err))
    }
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

/***** All transactions related with userID (sent and received) *****/
transactionsRouter
.route('/local/:id') //all transactions where user is involved
.get(async (req, res)=>{
    const userID = req.params.id
    try {
        const listLocalTransactions = await TransactionLocalService.getAllLocalTransactionsUser(userID)
        res.json(listLocalTransactions)
    } catch (err) {
        res
        .status(isValidationError(err) ? 400 : 500)
        .send(formatRequestError(err))
    }
})

/***** Sent transactions related with userID *****/
transactionsRouter
.route('/local/sender/:id')
.get(async (req, res)=>{
    console.log('entrando en un lugar incorrecto')
    const senderID = req.params.id
    const process = await TransactionLocalService.getAllLocalTransactionsSent(senderID)
    res.json(process)
})

/***** Received transactions related with userID *****/
transactionsRouter
.route('local/receiver/:id')
.get(async (req, res)=>{
    const receiverID = req.params.id
    const process = await TransactionLocalService.getAllLocalTransactionsReceived(receiverID)
    res.json(process)
})



/*********** Foreign transactions ***********/

/****** All sent transactions ********/
transactionsRouter
.route('/send')
.get(async (req, res)=>{
    const list = await TransactionForeignSendService.getForeignSendTransactions()
    res.json(list)
})
.post(async (req, res)=>{
    const info = req.body

    try {
        const obj = await TransactionForeignSendService.addForeignSendTransactions(info)
        obj !== null ? res.send(obj) : res.sendStatus(404)
    } catch (err) {
        res
        .status(isValidationError(err) ? 400 : 500)
        .send(formatRequestError(err))
    }
})

/****** Sent transactions by user ********/
transactionsRouter
.route('/send:id') //this is the user's id
.get(async (req, res)=>{
    const id = req.params.id
    const list = await TransactionForeignSendService.getForeignSendTransactionsUser(id)
    res.json(list)
})


/****** All received transactions ********/
transactionsRouter
.route('/receive')
.get(async (req, res)=>{
    const list = await TransactionForeignReceiveService.getForeignSendTransactions()
    res.json(list)
})
.post(async (req, res)=>{
    const info = req.body

    try {
        const obj = await TransactionForeignReceiveService.addForeignSendTransactions(info)
        obj !== null ? res.send(obj) : res.sendStatus(404)
    } catch (err) {
        res
        .status(isValidationError(err) ? 400 : 500)
        .send(formatRequestError(err))
    }
})

/****** Received transactions by user ********/
transactionsRouter
.route('/receive/:id')
.get(async (req, res)=>{
    const id = req.params.id //this is the user's id
    const list = await TransactionForeignReceiveService.getForeignReceivedTransactionsUser(id)
    res.json(list)
})


module.exports = transactionsRouter