import { Router } from "express";
import { getAllBudgetAccounts, getSingleBudgetAccount, createBudgetAccount, getAllTypeAccounts} from "../controllers/budgetController";
import { check } from "express-validator";

const router = Router();

// Ger all user budget accounts
router.get('/all-accounts',
    getAllBudgetAccounts,
)

// Get a single user budget account
router.get('/single-account/:accountNumber', 
    getSingleBudgetAccount
)

// Get all account types
router.get('/account-types',
    getAllTypeAccounts
)

// Create a new user Budget account
router.post('/create-account',
    [
        check('accountType', 'Please select the account type you want to create').not().isEmpty(),
        check('amount', 'Please enter the amount you would like to start with your account').isNumeric().not().isEmpty(),
        check('currency', 'Please select the type of currency you want to associate with this account').not().isEmpty()
    ],
    createBudgetAccount
)

export default router;