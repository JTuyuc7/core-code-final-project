const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const transferController = require('../controllers/transfersDepositsController');

router.get('/all',
    transferController.getAllTransactions
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
    transferController.newTransaction
);

// Get the account to be transfered amount
router.get('/find/:account', 
    transferController.findAccountReceiver
);

// Get all transfers and deposits by account
router.get('/all/:account',
    transferController.getAllTransactionsByAccount
)

module.exports = router;