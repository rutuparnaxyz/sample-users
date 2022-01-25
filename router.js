const express = require('express');
const router = new express.Router();
const userController = require('./controller/user-controller.js');

router.post('/users', userController.createUsers);
router.get('/users', userController.findUsers);


module.exports = router