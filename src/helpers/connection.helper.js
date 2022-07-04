const Sequelize = require('sequelize')

const sequelize = new Sequelize('heroku_1ec469e8a250f51', 'bd238f0529ff8d', 'c5dcee8d', {
    dialect: 'mysql',
    host: 'us-cdbr-east-06.cleardb.net'
})

module.exports = sequelize
