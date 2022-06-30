const accounsService = require('../services/account.service')

const generatorIBAN = ()=>{
    const max = 99999999999999999999
    let number
    let repeated = false
    const accountList = await accounsService.getAllAccounts()
    let flag = true

    while (flag) {
        number = Math.floor(Math.random() * max)

        accountList.forEach((x)=>{
            if(x.accountNumber === number){
                repeated = true
            }
        })

        if(!repeated){flag = false}
    }

    return number
}

module.exports = generatorIBAN