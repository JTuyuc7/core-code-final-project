const connectDB = require('../database/db');
const { validationResult } = require('express-validator');

// Get all transactions by account
exports.getAllTransactionsByAccount = async (req, res, next) => {
    // DB coonection
    const pool = await connectDB();

    // get the user
    const { userID } = req.user;

    // get the account to search for
    const { account } = req.params;
    const { filter } = req.query;
    // Check that the account exist
    const queryActiveAccount = `SELECT * FROM "userAccounts" WHERE "accountNumber" = '${account}'`;
    const resultActiveAccount = await pool.query(queryActiveAccount);
    if(resultActiveAccount.rowCount === 0){
        return res.json({ msg: 'Incorrect account number, check it and try again.'})
    }

    if(resultActiveAccount.rows[0].belongsTo !== userID ){
        return res.json({ msg: 'You do not have permissions to get see the data of the selected account.'});
    }

    let queryTransfersUniqueAccount = `SELECT "transfers"."movementId","transfers"."movementType","transfers"."description","transfers".amount,"transfers"."shippingAccount","transfers"."destinationAccount","transfers"."userTransferId","transfers"."userReceivedId", "transfers"."createdAt", "userBudget"."userID","userBudget"."userName","userBudget"."userLastName","userBudget"."userEmail" FROM "transfers"
        JOIN "userBudget"
        ON "userBudget"."userID" = "transfers"."userReceivedId" WHERE "transfers"."userTransferId" = ${userID} AND "transfers"."shippingAccount" = '${account}'`;

        let queryDepositsUniqueAccount = `SELECT "deposits"."movementId", "deposits"."movementType", "deposits"."description", "deposits"."amount", "deposits"."shippingAccount", "deposits"."destinationAccount","deposits"."userTransferId","deposits"."userReceivedId", "deposits"."createdAt", "userBudget"."userID","userBudget"."userName","userBudget"."userLastName","userBudget"."userEmail" FROM "deposits"
        JOIN "userBudget" 
        ON "userBudget"."userID" = "deposits"."userTransferId" WHERE "deposits"."userReceivedId" = ${userID} AND "deposits"."destinationAccount" = '${account}'`;

    // get the type of search
    try {

        let msgTransfers = '';
        let msgDeposits = '';
        
        let transfersData = []
        const resultTransfersAccount = await pool.query(queryTransfersUniqueAccount);
        if(resultTransfersAccount.rowCount === 0 ) {
            msgTransfers = 'You haven\'t made any transfers with this account.'
            transfersData = []
        }else {
            msgTransfers = 'The list of transfers made with this account';
            transfersData = [...resultTransfersAccount.rows]
        }

        let depositsData = []
        const resultDepositsAccount = await pool.query(queryDepositsUniqueAccount);
        if(resultDepositsAccount.rowCount === 0){
            msgDeposits = 'You haven\'t received any deposits for this account.'
            depositsData = []
        }else {
            msgDeposits = 'The list of deposits this account has received.'
            depositsData = [...resultDepositsAccount.rows]
        }

        if(resultTransfersAccount.rowCount === 0 && resultDepositsAccount.rowCount === 0) {
            return res.json({ msg: 'This account has not created any transactions yet.', movements: []})
        }

        let movements = [];
        
        if (filter === 'all') { // VALIDAR QUE CUANDO NO EXISTA DATA, RETORNAR UN ARREGLO VACIO
            movements = [...transfersData, ...depositsData];
        } else if (filter === 'transfers') {
            movements = [...transfersData];
        } else if (filter === 'deposits') {
            movements = [...depositsData];
        }

        return res.status(200).json({ msg: 'Your movements', movements: movements });
        // PREV IMPLEMENTATION
        // return res.status(200).json([ { msg: msgTransfers, transfers: resultTransfersAccount.rows}, { msg: msgDeposits, deposits: resultDepositsAccount.rows }])

    } catch (error) {
        console.log(error, 'Unable to get the response your are looking for.')
        res.status(500).json({ msg: 'Server error, unable to get your response.'})
    }
}

// Get all transactions by user
exports.getAllTransactions = async (req, res, next) => {

    // Connect
    const pool = await connectDB();

    // Get the current user ID 
    const { userID } = req.user;
    //let queryTrnnsfers = `SELECT * FROM "transfers" WHERE "userTransferId" = ${userID}`;
    let queryTransfers = `SELECT "transfers"."movementId","transfers"."movementType","transfers".description,"transfers".amount,"transfers"."shippingAccount","transfers"."destinationAccount","transfers"."userTransferId","transfers"."userReceivedId","transfers"."createdAt","userBudget"."userID","userBudget"."userName","userBudget"."userLastName","userBudget"."userEmail" FROM "transfers"
    JOIN "userBudget"
    ON "userBudget"."userID" = "transfers"."userReceivedId" WHERE "transfers"."userTransferId" = ${userID}`;

    // All the deposits I have recieved
    let queryDeposits = `SELECT "deposits"."movementId", "deposits"."movementType", "deposits"."description", "deposits"."amount", "deposits"."shippingAccount", "deposits"."destinationAccount","deposits"."userTransferId","deposits"."userReceivedId","deposits"."createdAt", "userBudget"."userID","userBudget"."userName","userBudget"."userLastName","userBudget"."userEmail" FROM "deposits"
    JOIN "userBudget" 
    ON "userBudget"."userID" = "deposits"."userTransferId" WHERE "deposits"."userReceivedId" = ${userID}`;
    try {
        let msgTransfers = '';
        let msgDesposits = '';
        const myTransfersResult = await pool.query(queryTransfers);

        if(myTransfersResult.rowCount === 0){
            msgTransfers = 'You do not have any transfers associated with your accounts yet';
        }else {
            msgTransfers = 'Your transfers list';
        }

        const myDepositsResult = await pool.query(queryDeposits);
        if(myDepositsResult.rowCount === 0) {
            msgDesposits = 'You do not have any deposits associated with your accounts yet.'
        }else {
            msgDesposits = 'Your deposits list'
        }

        if(myTransfersResult.rowCount === 0 && myDepositsResult.rowCount === 0 ){
            return res.json({ msg: 'You do not have any transactions yet.', movements: []})
        }

        const allData = [...myTransfersResult.rows, ...myDepositsResult.rows];

        //return res.status(200).json([ { msg: msgTransfers, transfers: myTransfersResult.rows}, { msg: msgDesposits, deposits: myDepositsResult.rows } ])
        return res.status(200).json({ msg: 'Your movements', movements: allData });

    } catch (error) {
        console.log(error, 'Unable to get all the transactions')
        res.status(500).json({ msg: 'Server error, please try again later'})
    }
}

exports.findAccountReceiver = async (req, res, next) => {
    // DB connection
    const pool = await connectDB();

    // Extract the account to find
    const { account } = req.params;

    try {
        let query = `SELECT "userAccounts"."accountId", "userAccounts"."accountNumber", "userAccounts"."belongsTo","userBudget"."userName", "userBudget"."userLastName" FROM "userAccounts"
        JOIN "userBudget"
        on "userBudget"."userID" = "userAccounts"."belongsTo"
        where "accountNumber" = '${account}'`;
        const userAccount = await pool.query(query);

        if( userAccount.rowCount === 0){
            return res.json({ msg: `No accounts found, check it and try again.`, codeStatus: 2}) // 2 Not found
        }

        return res.status(200).json({ msg: 'User found', accountUser: userAccount.rows[0], codeStatus: 1 }); // 1 Found
        
    } catch (error) {
        console.log(error, 'Unable to find the receiver account');
        res.status(500).json({ msg: 'Server error unable to find the account.'})
    }finally {
        // Close connection
        await pool.end();
    }
}

// Make a new transfer
exports.newTransaction = async (req, res, next) => {

    // Connection
    const pool = await connectDB();

    // Validate errors b
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()})
    }

    // Current user who make the transfer.
    const { userID } = req.user;
    const { movementType, description, amount, shippingAccount, destinationAccount, userReceivedId } = req.body;
    // Get the amount that is available on the sender account
    let querySenderAccount = `SELECT * FROM "userAccounts" WHERE "belongsTo" = ${userID} AND "accountNumber" = '${shippingAccount}'`;
    let resultSenderAccount = await pool.query(querySenderAccount);
    let amountDB = {...resultSenderAccount.rows[0]};
    let prevAmount = Number(amountDB.amount);
    let newUpdatedAmountDeposit = prevAmount - amount; // Account transfer -

    // get info of deposit account
    let queryDepositAccount = `SELECT * FROM "userAccounts" WHERE "belongsTo" = ${userReceivedId} AND "accountNumber" = '${destinationAccount}'`;
    let resultDepostiAcc = await pool.query(queryDepositAccount);
    let accDepositObj = {...resultDepostiAcc.rows[0]};
    let prevAmDeposit = Number(accDepositObj.amount); // Account deposited +
    let updatedAmountDeposti = prevAmDeposit + amount;

    if(amount > prevAmount){
        return res.json({ msg: 'The amount exceeds what is available in your account.'})
    }
    try {
        // Save the new Movement type of transfer
        let queryTransfer = `INSERT INTO "transfers" ("movementType", "description", "amount", "shippingAccount", "destinationAccount", "userTransferId", "userReceivedId") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
        let valuesTransfer = [movementType, description, amount, shippingAccount, destinationAccount, userID, userReceivedId];
        const resultTransfer = await pool.query(queryTransfer, valuesTransfer);
        if(resultTransfer.rowCount === 0){
            return res.json({ msg: 'The transfer could not be completed.'})
        }

        let queryDeposit = `INSERT INTO "deposits" ("movementType", "description", "amount", "shippingAccount", "destinationAccount", "userTransferId", "userReceivedId") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
        //let queryDeposit = `INSERT INTO "transfers" ("transferType", "desctiption", "amount", "shippingAccount", "destinationAccount", "userTransferId", "userReceivedId") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
        let valuesDeposit = ["Deposit", description, amount, shippingAccount, destinationAccount, userID, userReceivedId];
        const resultDeposit = await pool.query(queryDeposit, valuesDeposit);
        if(resultDeposit.rowCount === 0) {
            return res.json({ msg: 'The deposit could not be completed.'})
        }

        // Update amount on the corresponding accounts
        let queryUpdateTransferAccount = `UPDATE "userAccounts" SET "amount" = ${newUpdatedAmountDeposit} WHERE "belongsTo" = ${userID} AND "accountNumber" = '${shippingAccount}' RETURNING *`;
        const resultAmountUpdatedTransfer = await pool.query(queryUpdateTransferAccount);
        if(resultAmountUpdatedTransfer.rowCount === 0){
            return res.json({ msg: 'Seems we had an issue, please contact our bank support.'})
        }

        let queryUpdateDepositAccount = `UPDATE "userAccounts" SET "amount" = ${updatedAmountDeposti} WHERE "belongsTo" = ${userReceivedId} AND "accountNumber" = '${destinationAccount}' RETURNING *`;
        const resultAmountUpdatedDeposit = await pool.query(queryUpdateDepositAccount);
        if( resultAmountUpdatedDeposit.rowCount === 0){
            return res.json({ msg: 'Seems we had an issue, please contact our bank support.'})
        }
        return res.status(200).json({ msg: 'Transaction completed successfully.', data: resultAmountUpdatedTransfer.rows[0]})

    } catch (error) {
        console.log(error, 'Unable to complete the transfer or deposit')
    }finally {
        // Close connection
        await pool.end();
    }
}