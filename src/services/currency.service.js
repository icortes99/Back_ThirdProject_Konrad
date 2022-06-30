const sequelize = require('../helpers/connection.helper')
const CurrencySchema = require('../models/currency.model')

class CurrencyService{
    static async getAllCurrencies(){
        const currencies = await CurrencySchema.findAll()
        return currencies
    }

    static async addCurrency(newCurrencyInfo){
        const newCurrency = await CurrencySchema.create(newCurrencyInfo)
        return newCurrency
    }

    static async deleteCurrency(currencyID){
        const deletedCurrency = await CurrencySchema.findByPk(currencyID)
        const deletedCurrencyProcess = await sequelize.query(`DELETE FROM currencies WHERE currencies.idCurrency = ${deletedCurrency.idCurrency}`)
        return deletedCurrency
    }

    static async updateCurrency(id, data){
        const updatedCurrency = await sequelize.query(`UPDATE currencies SET colonValue = ${data.colonValue}
            WHERE currencies.idCurrency = ${id}`)
        const alreadyUpdated = await CurrencySchema.findByPk(id)
        return alreadyUpdated
    }
}

module.exports = CurrencyService