import { Router } from "express";
import { getAllTransactions, newTransaction, findAccountReceiver, getAllTransactionsByAccount } from "../controllers/transfersDepositsController";
import { check } from "express-validator";

const router = Router();

router.get('/all',
    getAllTransactions
);

// Make a Transfer
router.post('/transfer',
    [
        check('description', 'Please enter a description for the transfer.').not().isEmpty(),
        check('amount', 'Amount can not be 0').isNumeric().not().isEmpty(),
        check('shippingAccount', 'Account transfer is required for the transaction').not().isEmpty().isLength({min: 8}),
        check('destinationAccount', 'Account destination is a required to complete the transaction').not().isEmpty().isLength({min: 8}),
        //check('userTransferId', 'Sender ID is required to complete the transaction.').isNumeric().not().isEmpty(),
        check('userReceivedId', 'Receiver ID is required to complete the transaction.').isNumeric().not().isEmpty()
    ],
    newTransaction
);

// Get the account to be transfered amount
router.get('/find/:account', 
    findAccountReceiver
);

// Get all transfers and deposits by account
router.get('/all/:account',
    getAllTransactionsByAccount
)

export default router;