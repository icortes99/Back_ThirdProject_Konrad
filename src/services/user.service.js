const UserSchema = require('../models/user.model')
const sequelize = require('../helpers/connection.helper')

class UserService{
    static async getAllUsers(){
        const users = await UserSchema.findAll()
        return users
    }

    static async getUser(id){
        const user = await UserSchema.findByPk(id)
        return user
    }

    static async addUser(newUserInfo){
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