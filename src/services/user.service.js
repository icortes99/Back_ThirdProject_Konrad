const UserSchema = require('../models/user.model')
const sequelize = require('../helpers/connection.helper')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

class UserService{
    static async getAllUsers(){
        const users = await UserSchema.findAll()
        return users
    }

    static async getUser(inId, inPassword){ //log in
        const user = await UserSchema.findByPk(inId)
        if(user){
            let passwordApproved = await bcrypt.compare(inPassword, user.password)
            if(passwordApproved){
                let sendUser = { //this is to avoid send sensitive info as password or incomeSource
                    "idUser": user.idUser,
                    "email": user.email,
                    "name": user.name,
                    "lastname": user.lastname,
                    "photo": user.photo
                }
                let auth = jwt.sign(sendUser, 'admin123',{
                    expiresIn: '1d'
                })
                return({status: true, msg: auth})
            } else {
                return({ status: false, msg: 'Wrong password'})
            }
        } else {
            return({ status: false, msg: 'User does not exist'})
        }
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