const express = require('express')
const TransactionForeignReceiveService = require('../services/transactionForeignReceive.service')
const transactionFRRouter = express.Router()
const {isValidationError, formatRequestError} = require('../helpers/error.helper')

transactionFRRouter
.route('/')
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

transactionFRRouter
.route('/:id')
.get(async (req, res)=>{
    const id = req.params.id
    const list = await TransactionForeignReceiveService.getForeignReceivedTransactionsUser(id)
    res.json(list)
})