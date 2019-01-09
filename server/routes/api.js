const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controllers');
const channelController = require('../controllers/channel.controller');
const privateMessageController = require('../controllers/privateMessage.controller');
const auth = require('../modules/auth');

router.post('/signup', userController.signup);

router.post('/login', userController.login);

router.get('/allUser', userController.listOfUser);

router.post('/create', channelController.create );

router.get('/isLoggedin', auth.isLoggedIn, userController.isLoggedin);

router.get('/allChannel', channelController.allChannel);

router.post('/message', privateMessageController.privateMessage);

router.get('/channel/:id', channelController.channelMessages);

module.exports = router;