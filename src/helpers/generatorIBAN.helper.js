const AccountSchema = require('../models/account.model')

const generatorIBAN = async()=>{
    const max = 99999999999999999999
    let number
    let repeated = true

    while (repeated) {
        number = Math.floor(Math.random() * max) + 10000000000000000000

        let temp = JSON.stringify(number)

        const accountList = await AccountSchema.findByPk(temp)

        if(accountList === null){
            repeated = false
        }
    }

    let stringNumber = JSON.stringify(number)

    return stringNumber
}

module.exports = generatorIBAN