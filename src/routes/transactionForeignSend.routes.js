const express = require('express')
const TransactionForeignSendService = require('../services/transactionForeignSend.service')
const transactionFSRouter = express.Router()
const {isValidationError, formatRequestError} = require('../helpers/error.helper')

transactionFSRouter
.route('/')
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

transactionFSRouter
.route('/:id')
.get(async (req, res)=>{
    const id = req.params.id
    const list = await TransactionForeignSendService.getForeignSendTransactionsUser(id)
    res.json(list)
})