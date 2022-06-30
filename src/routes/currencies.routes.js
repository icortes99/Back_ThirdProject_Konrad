const express = require('express')
const CurrencyService = require('../services/currency.service')
const currencyRouter = express.Router()
const {isValidationError, formatRequestError} = require('../helpers/error.helper')

currencyRouter
.route('/')
.get(async (req, res)=>{
    const listCurrencies = await CurrencyService.getAllCurrencies()
    res.json(listCurrencies)
})
.post(async (req, res)=>{
    const currencyInfo = req.body

    try {
        const obj = await CurrencyService.addCurrency(currencyInfo)
        obj !== null ? res.send(obj) : res.sendStatus(404)
    } catch (err) {
        res
        .status(isValidationError(err) ? 400 : 500)
        .send(formatRequestError(err))
    }
})

currencyRouter
.route('/:id')
.delete(async (req, res)=>{
    const deleteCurrency = req.params.id
    const process = await CurrencyService.deleteCurrency(deleteCurrency)
    res.send(deleteCurrency)
})
.put(async (req, res)=>{
    const currencyID = req.params.id
    const currencyData = req.body

    try {
        const updatedCurrency = await CurrencyService.updateCurrency(currencyID, currencyData)
        updatedCurrency ? res.json(updatedCurrency) : res.sendStatus(404)
    } catch (err) {
        res
        .status(isValidationError(err) ? 400 : 500)
        .send(formatRequestError(err))
    }
})

module.exports = currencyRouter