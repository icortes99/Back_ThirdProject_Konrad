const sequelize = require('../helpers/connection.helper')
const AccountSchema = require('../models/account.model')

class AccountService{
    static async getAllAccounts(){
        const accounts = await AccountSchema.findAll()
        return accounts
    }

    static async getAccountsByUser(inIdUser){
        const accounts = await AccountSchema.findAll({ where: {userIdUser: inIdUser}})
        return accounts
    }

    static async addAccount(newAccountInfo){
        const newAccount = await AccountSchema.create(newAccountInfo)
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