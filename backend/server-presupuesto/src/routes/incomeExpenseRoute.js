import { Router } from 'express';
import { check } from 'express-validator';
import { addNewIncomeExpense, getAllIncomesExpensesByUser, getAllIncomesExpenseByAccount } from '../controllers/incomeExpenseController';

const router = Router();

// Get all the registered incomes by User ID
router.get('/all',
    getAllIncomesExpensesByUser
)

// Get all income / expense by account and user ID
router.get('/all/:account',
    getAllIncomesExpenseByAccount
)

// Add new income / expense
router.post('/new/:account',
    [
        check('description', 'The description is a required field').not().isEmpty(),
        check('inExType', 'Please select an option income / expense').not().isEmpty(),
        check('amount', 'Amount is required and should be grater than 0').isNumeric().not().isEmpty()
    ],
    addNewIncomeExpense
)

export default router;