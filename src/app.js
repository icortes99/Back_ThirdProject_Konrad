const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const sequelize = require('./helpers/connection.helper')
const usersRouter = require('./routes/users.routes')
const accountsRouter = require('./routes/accounts.routes')
const error = require('./middleware/error.middleware')
const userModel = require('./models/user.model')
const accountModel = require('./models/account.model')
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

userModel.hasMany(accountModel)

sequelize
    //.sync({force: true})
    .sync()
    .then((result)=>{
        console.log(result)
    })
    .catch((err)=>{
        console.log(err)
    })

app.get('/', (req, res)=>{
    res.send('Default page')
})

app.use('/users', usersRouter)
app.use('/accounts', accountsRouter)
app.use(error)
module.exports = app