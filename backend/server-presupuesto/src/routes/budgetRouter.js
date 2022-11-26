const express = require('express');
const router = express.Router();
const budgetController = require('../controllers/budgetController');
const { check } = require('express-validator');

// Ger all user budget accounts
router.get('/all-accounts',
   budgetController.getAllBudgetAccounts,
)

// Get a single user budget account
router.get('/single-account/:accountNumber', 
    budgetController.getSingleBudgetAccount
)

// Get all account types
router.get('/account-types',
    budgetController.getAllTypeAccounts
)

// Create a new user Budget account
router.post('/create-account',
    [
        check('accountType', 'Please select the account type you want to create').not().isEmpty(),
        check('amount', 'Please enter the amount you would like to start with your account').isNumeric().not().isEmpty(),
        check('currency', 'Please select the type of currency you want to associate with this account').not().isEmpty()
    ],
    budgetController.createBudgetAccount
)

module.exports = router;