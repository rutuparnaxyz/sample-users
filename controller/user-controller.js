const userModel = require('../model/user-model.js');
const userService = require('../service/user-service.js')

async function createUsers(req, res) {
    try {
        const validationRes = await userService.validateUsersUsingRecursion(req.body);
        await userModel.insertMany(validationRes.validUsers);
        res.status(201).send(validationRes.responseObject)
    } catch (err) {
        res.status(400).send(err)
    }
}

async function findUsers(req, res){
    try {
        const users = await userModel.find();
        res.status(200).send(users)
    } catch (error) {
        res.status(417).send(err)
    }
}

module.exports = {createUsers, findUsers}