const UserSchema = require('../models/user.model')
const AccountService = require('./account.service')
const TransactionForeignReceive = require('./transactionForeignReceive.service')
const TransactionForeignSend = require('./transactionForeignSend.service')
const TransactionLocal = require('./transactionLocal.service')
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
                let sendUser = { //this is to avoid send sensitive info as password or incomeSource
                    "idUser": user.idUser,
                    "password": user.password,
                    "email": user.email,
                    "name": user.name,
                    "lastname": user.lastname,
                    "photo": user.photo,
                    "incomeSource": user.incomeSource
                }
                let userAccounts = (AccountService.getAccountsByUser(user.idUser))
                let tlocals = (TransactionLocal.getAllLocalTransactions(user.idUser))
                let tfreceive = (TransactionForeignReceive.getForeignReceivedTransactionsUser(user.idUser))
                let tfsend = (TransactionForeignSend.getForeignSendTransactionsUser(user.idUser))
                let allTransaction = [tlocals, tfreceive, tfsend]
                let auth = jwt.sign(sendUser, 'admin123',{
                    expiresIn: '1d'
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
                return({status: true, msg: objUser})
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
        const newUser = await UserSchema.create(newUserInfo)
        return newUser
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