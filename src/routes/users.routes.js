const express = require('express')
const UserService = require('../services/user.service')
const usersRouter = express.Router()
const {isValidationError, formatRequestError} = require('../helpers/error.helper')

usersRouter
.route('/')
.get(async (req, res)=>{
    const listUsers = await UserService.getAllUsers()
    res.send(listUsers)
})
.post(async (req,res)=>{
    const userInfo = req.body

    try {
        const obj = await UserService.addUser(userInfo)
        obj !== null ? res.send(obj) : res.sendStatus(404)
    } catch (err) {
        res
        .status(isValidationError(err) ? 400 : 500)
        .send(formatRequestError(err))
    }
})

usersRouter
.route('/:id')
.get(async (req, res)=>{
    const id = req.params.id
    const user = await UserService.getUser(id)
    user ? res.send(user) : res.send(400).status('Not found')
}).put(async (req, res)=>{
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