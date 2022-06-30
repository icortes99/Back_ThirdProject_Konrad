const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const sequelize = require('./helpers/connection.helper')
const usersRouter = require('./routes/users.routes')
const accountsRouter = require('./routes/accounts.routes')
const currenciesRouter = require('./routes/currencies.routes')
const transactionFSrouter = require('./routes/transactionForeignReceive.routes')
const transactionFRrouter = require('./routes/transactionForeignReceive.routes')
const transactionLrouter = require('./routes/transactionLocal.routes')
const error = require('./middleware/error.middleware')
const userModel = require('./models/user.model')
const accountModel = require('./models/account.model')
const currencyModel = require('./models/currency.model')
const transactionLocal = require('./models/transactionLocal.model')
const transactionForeignSend = require('./models/transactionForeignSend.model')
const transactionForeignReceive = require('./models/transactionForeignReceive.model')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

userModel.hasMany(accountModel)
userModel.hasMany(transactionLocal, {foreignKey: 'sender'})
userModel.hasMany(transactionLocal, {foreignKey: 'receiver'})
userModel.hasMany(transactionForeignSend, {foreignKey: 'sender'})
userModel.hasMany(transactionForeignReceive, {foreignKey: 'receiver'})
currencyModel.hasMany(accountModel, {foreignKey: 'currencyCode'})
currencyModel.hasMany(transactionLocal, {foreignKey: 'currencyCode'})
currencyModel.hasMany(transactionForeignSend, {foreignKey: 'currencyCode'})
currencyModel.hasMany(transactionForeignReceive, {foreignKey: 'currencyCode'})
accountModel.hasMany(transactionLocal, {foreignKey: 'senderAccount'})
accountModel.hasMany(transactionLocal, {foreignKey: 'receiverAccount'})
accountModel.hasMany(transactionForeignSend, {foreignKey: 'senderAccount'})
accountModel.hasMany(transactionForeignReceive, {foreignKey: 'receiverAccount'})

sequelize
    .sync({force: true})
    //.sync()
    .then((result)=>{
        console.log(result)
    })
    .catch((err)=>{
        console.log(err)
    })

app.get('/', (req, res)=>{
    res.send('Immersive Program`s Third Project API, by Ivan Cortes')
})

app.use('/users', usersRouter)
app.use('/accounts', accountsRouter)
app.use('/tactionLocal', transactionLrouter)
app.use('/tactionFSend', transactionFSrouter)
app.use('/tactionFReceive', transactionFRrouter)
app.use('/currencies', currenciesRouter)
app.use(error)
module.exports = app