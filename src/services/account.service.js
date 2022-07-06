const sequelize = require('../helpers/connection.helper')
const AccountSchema = require('../models/account.model')
const UserSchema = require('../models/user.model')
const generatorIBAN = require('../helpers/generatorIBAN.helper')

class AccountService{
    static async getAllAccounts(){
        const accounts = await AccountSchema.findAll()
        return accounts
    }

    static async getAccountsByUser(inIdUser){
        const accounts = await AccountSchema.findAll({ where: {userIdUser: inIdUser}})
        return accounts
    }

    static async getUserByNumber(inAccNumber){
        const account = await AccountSchema.findByPk(inAccNumber)
        const user = await UserSchema.findByPk(account.userIdUser)
        return user
    }

    static async addAccount(newAccountInfo){
        let newNumber = await generatorIBAN()
        const finallyAccount = {
            "accountNumber": newNumber,
            "accountBalance": newAccountInfo.accountBalance,
            "userIdUser": newAccountInfo.userIdUser,
            "currencyCode": newAccountInfo.currencyCode
        }
        console.log('finally account: ', JSON.stringify(finallyAccount))
        const newAccount = await AccountSchema.create(finallyAccount)
        return newAccount
    }

    static async deleteAccount(accountID){
        const deletedAccount = await AccountSchema.findByPk(accountID)
        const deletedAccountProcess = await sequelize.query(`DELETE FROM accounts WHERE accounts.accountNumber = ${deletedAccount.accountNumber}`)
        return deletedAccount
    }

    static async updateAccount(id, data){
        const updatedAccount = await sequelize.query(`update accounts set accountBalance = ${data.accountBalance}
            where accounts.accountNumber = ${id}`)
        const alreadyUpdated = await AccountSchema.findByPk(id)
        return alreadyUpdated
    }
}

module.exports = AccountService