const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controllers');
const auth = require('../modules/auth');

router.post('/signup', userController.signup);

router.post('/login', userController.login);


router.get('/isLoggedin', auth.isLoggedIn, userController.isLoggedin);

module.exports = router;