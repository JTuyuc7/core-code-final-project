const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const loginController = require('../controllers/loginController');

router.post('/', 
    [
        check('userEmail', 'Email is required to login to your account').not().isEmpty().isEmail(),
        check('userPassword', 'Password is required to login').not().isEmpty()
    ],
    loginController.loginController
)

module.exports = router;