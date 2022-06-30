const Sequelize = require('sequelize')
const sequelize = require('../helpers/connection.helper')

const CurrencySchema = sequelize.define('currency', {
    idCurrency: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    colonValue: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    prefix: { //this is to display just before the IBAN's
        type: Sequelize.STRING,
        allowNull: false
    },
    symbol: { //This is for $, ₡, €, etc
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = CurrencySchema