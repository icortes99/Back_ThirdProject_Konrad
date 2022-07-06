const UserSchema = require('../models/user.model')
const AccountService = require('./account.service')
const TransactionForeignReceive = require('./transactionForeignReceive.service')
const TransactionForeignSend = require('./transactionForeignSend.service')
const TransactionLocal = require('./transactionLocal.service')
const CurrencyService = require('./currency.service')
const sequelize = require('../helpers/connection.helper')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

class UserService{
    static async getAllUsers(){
        const users = await UserSchema.findAll()
        return users
    }

    static async getUser(inEmail, inPassword){ //log in
        const user = await UserSchema.findOne({
            where: {email: inEmail}
        })
        if(user){
            let passwordApproved = await bcrypt.compare(inPassword, user.password)
            if(passwordApproved){
                let sendUser = {
                    "idUser": user.idUser,
                    "email": user.email
                }
                let userAccounts =  await AccountService.getAccountsByUser(user.idUser)
                let tlocals = await TransactionLocal.getAllLocalTransactions(user.idUser)
                let tfreceive = await TransactionForeignReceive.getForeignReceivedTransactionsUser(user.idUser)
                let tfsend = await TransactionForeignSend.getForeignSendTransactionsUser(user.idUser)
                let allTransaction = [tlocals, tfreceive, tfsend]
                let auth = jwt.sign(sendUser, 'admin123',{
                    expiresIn: '3d'
                })
                let objUser = {
                    "token": auth,
                    "name": user.name,
                    "lastname": user.lastname,
                    "photo": user.photo,
                    "incomeSource": user.incomeSource,
                    "accounts": userAccounts,
                    "transactions": allTransaction
                }
                let objCurrencies = await CurrencyService.getAllCurrencies()
                let bigFetch = [objUser, objCurrencies]
                return({status: true, msg: bigFetch})
            } else {
                return({ status: false, msg: 'Wrong password'})
            }
        } else {
            return({ status: false, msg: 'User does not exist'})
        }
    }

    static async getInfoUser(inID){
        const user = await UserSchema.findByPk(inID)
        if(user){
            let userInfo = {
                "idUser": user.idUser,
                "email": user.email,
                "name": user.name,
                "lastname": user.lastname,
                "incomeSource": user.incomeSource,
                "photo": user.photo
            }
            return userInfo
        } else {
            return 'user does not exist'
        }
    }

    static async getInfoUserEmail(inEmail){
        const user = await UserSchema.findOne({
            where: {email: inEmail}
        })
        if(user){
            let userInfo = {
                "idUser": user.idUser,
                "email": user.email,
                "name": user.name,
                "lastname": user.lastname,
                "incomeSource": user.incomeSource,
                "photo": user.photo
            }
            return userInfo
        } else {
            return 'user does not exist'
        }
    }

    static async idAndEmailExist(inID, inEmail){
        let exists = false
        const userEmail = await sequelize.query(`SELECT * FROM users WHERE users.email = ${inEmail}`)
        const userID = await UserSchema.findByPk(inID)

        if(userID || userEmail){
            exists = true
        }
        return exists
    }

    static async addUser(newUserInfo){ //sign up
        const verifyID = await UserSchema.findByPk(newUserInfo.idUser)
        const verifyEmail = await this.getInfoUserEmail(newUserInfo.email)

        if(verifyEmail == 'user does not exist'){
            if(verifyID == null){
                const newUser = await UserSchema.create(newUserInfo)

                if(newUser){
                    const acc1 = {
                        "accountBalance": 100000,
                        "userIdUser": newUser.idUser,
                        "currencyCode": 4
                    }

                    console.log(JSON.stringify('account object 1', acc1))

                    const acc2 = {
                        "accountBalance": 250,
                        "userIdUser": newUser.idUser,
                        "currencyCode": 14
                    }

                    try {
                        const accountAdd1 = await AccountService.addAccount(acc1)
                    } catch (err) {
                        return err
                    }
                    try {
                        const accountAdd2 = await AccountService.addAccount(acc2)
                    } catch (err) {
                        return err
                    }
                    return newUser
                }
            } else {
                return 'ID already used'
            }
        } else {
            return 'Email already exists'
        }
    }

    static async deleteUser(id){
        const deletedUser = await UserSchema.findByPk(id)
        const deletedUserProcess = await sequelize.query(`DELETE FROM users WHERE users.idUser = ${deletedUser.idUser}`)
        return deletedUser
    }

    static async updateUser(id, data){
        const updatedUser = await sequelize.query(`UPDATE users SET email = ${data.email}, name = ${data.name},
            lastname = ${data.lastname}, password = ${data.password}, incomeSource = ${data.incomeSource}, photo = ${data.photo}
            WHERE users.idUser = ${id}`)
        const alreadyUpdated = await UserSchema.findByPk(id)
        return alreadyUpdated
    }
}

module.exports = UserService