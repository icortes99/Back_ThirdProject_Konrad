const express = require('express')
const AccountService = require('../services/account.service')
const accountRouter = express.Router()
const {isValidationError, formatRequestError} = require('../helpers/error.helper')
const authenticationMiddleware = require('../middleware/authenticate.middleware')

accountRouter
.route('/')
.get(authenticationMiddleware, async (req, res)=>{
    const listAccounts = await AccountService.getAllAccounts()
    res.send(listAccounts) //res.json(listAccounts)
})
.post(authenticationMiddleware, async (req, res)=>{
    const accountInfo = req.body

    try {
        const obj = await AccountService.addAccount(accountInfo)
        obj !== null ? res.send(obj) : res.sendStatus(404)
    } catch (err) {
        res
        .status(isValidationError(err) ? 400 : 500)
        .send(formatRequestError(err))
    }
})

accountRouter
.route('/:id')
.get(async (req, res)=>{
    const id = req.params.id //this is the owners id
    const relatedAccounts = await AccountService.getAccountsByUser(id)
    res.send(relatedAccounts)
})
.put(async (req, res)=>{
    const id = req.params.id
    const info = req.body

    try {
        const updateAccount = await AccountService.updateAccount(id, info)
        updateAccount ? res.send(updateAccount) : res.sendStatus(400)
    } catch (err) {
        res
        .status(isValidationError(err) ? 400 : 500)
        .send(formatRequestError(err))
    }
})
.delete(async (req, res)=>{
    const id = req.params.id //this is the account id
    const deletedAccount = await AccountService.deleteAccount(id)
    res.send(deletedAccount)
})

module.exports = accountRouter