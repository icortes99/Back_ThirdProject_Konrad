const express = require('express')
const bcrypt = require('bcrypt')
const UserService = require('../services/user.service')
const usersRouter = express.Router()
const {isValidationError, formatRequestError} = require('../helpers/error.helper')

/********* Get all users ***********/
usersRouter
.route('/')
.get(async (req, res)=>{
    const listUsers = await UserService.getAllUsers()
    res.json(listUsers)
})

/********* Sign up ***********/
usersRouter
.route('/signup')
.post(async (req, res)=>{
    const userInfo = req.body
    let passwordTmp = userInfo.password
    const crypt = await bcrypt.genSalt(10)
    userInfo.password = await bcrypt.hash(passwordTmp, crypt)

    try {
        const obj = await UserService.addUser(userInfo)
        obj !== null ? res.send(obj) : res.sendStatus(404)
    } catch (err) {
        res
        .status(isValidationError(err) ? 400 : 500)
        .send(formatRequestError(err))
    }
})

/********* Log in ***********/
usersRouter
.route('/login')
.post(async (req, res)=>{
    const credentials = req.body

    try {
        const userToken = await UserService.getUser(credentials.email, credentials.password)
        userToken.status ? res.json(userToken.msg) : res.send(userToken.msg).status(403)
    } catch (err) {
        res
        .status(isValidationError(err) ? 400 : 500)
        .send(formatRequestError(err))
    }
})

/********* Update and delete, not used yet ***********/
usersRouter
.route('/:id')
.get(async (req, res)=>{
    const id = req.params.id
    const user = await UserService.getInfoUser(id)
    user ? res.send(user) : res.send(400).status('Not found')
})
.put(async (req, res)=>{
    const id = parseInt(req.params.id)
    const info = req.body

    try {
        const updateUser = await UserService.updateUser(id, info)
        updateUser ? res.send(updateUser) : res.sendStatus(400)
    } catch (err) {
        res
        .status(isValidationError(err) ? 400 : 500)
        .send(formatRequestError(err))
    }
})
.delete(async (req, res)=>{
    const id = req.params.id
    const user = await UserService.deleteUser(id)
    user ? res.send(user) : res.send(400).status('Not found')
})

module.exports = usersRouter