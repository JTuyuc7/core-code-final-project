const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const userController = require('../controllers/userController');

// Routes to create a new User
router.post('/', 
    // Validations here and connect to controller
    [
        check('userName', 'User name is a required field').not().isEmpty().trim(),
        check('userLastName', 'Last name is required field').not().isEmpty(),
        check('userEmail', 'Email is a required field').isEmail().normalizeEmail(),
        check('userPassword', 'Password is required and hast to be 6 min characters').isLength({ min: 6 }).not().isEmpty()
    ],
    userController.createUser
);

// Verify the email
router.post('/check-email',
    [
        check('email', 'Please enter an email address').isEmail().not().isEmpty(),
    ],
    userController.verifyUniqueEmail
)

module.exports = router;