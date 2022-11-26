const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const incomeExpenseController = require('../controllers/incomeExpenseController');

// Get all the registered incomes by User ID
router.get('/all',
    incomeExpenseController.getAllIncomesExpensesByUser
)

// Get all income / expense by account and user ID
router.get('/all/:account',
    incomeExpenseController.getAllIncomesExpenseByAccount
)

// Add new income / expense
router.post('/new/:account',
    [
        //check('description', 'The description is a required field').not().isEmpty(),
        check('inExType', 'Please select an option income / expense').not().isEmpty(),
        check('amount', 'Amount is required and should be grater than 0').isNumeric().not().isEmpty()
    ],
    incomeExpenseController.addNewIncomeExpense
)

module.exports = router;