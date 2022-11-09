import { connectDB } from "../database/db";
import { validationResult } from "express-validator";

// All incomes or expense by user and specific account
export const getAllIncomesExpenseByAccount = async (req, res, next) => {
    // Connect DB
    const pool = await connectDB();

    // Get the current userID
    const { userID } = req.user;
    const { account } = req.params;
    const { type } = req.query;
    let queryDefault = ``;
    if(JSON.stringify(req.query) === '{}' ) {
        queryDefault = `SELECT * FROM "incomeExpense" WHERE "userBelongsTo" = ${userID} AND "inAccBelongsTo" = '${account}'`
    }else {
        queryDefault = `SELECT * FROM "incomeExpense" WHERE "userBelongsTo" = ${userID} AND "inAccBelongsTo" = '${account}' AND "inExType" = '${type}'`;
    }
    try {

        const resultData = await pool.query(queryDefault);
        if(resultData.rowCount === 0){
            return res.json({ msg: 'There is not income / expense recorded yet.'})
        }

        return res.status(200).json({ msg: 'Your list', data: resultData.rows })
        
    } catch (error) {
        console.log(error, 'Unable to get the account income / expense')
        res.status(500).json({ msg: 'Server error unable to get your incomes / expenses.'})
    }

}

// Get all the expenses and icomes by user and all accounts
export const getAllIncomesExpensesByUser = async (req, res, next) => {

    // Get the connection
    const pool = await connectDB();

    // Get the current userID
    const { userID } = req.user;
    try {
        
        let allIncomeExpenseQuery = `SELECT * FROM "incomeExpense" WHERE "userBelongsTo" = ${userID}`;
        const resultQuery = await pool.query(allIncomeExpenseQuery);

        if(resultQuery.rowCount === 0){
            return res.json({ msg: 'There is no income, expense yet, start adding one.'})
        }

        return res.status(200).json({ msg: 'All your incomes / expenses ', data: resultQuery.rows })

    } catch (error) {
        console.log(error, 'Unable to get all the incomes and expenses')
        res.status(500).json({ msg: 'Server error, unable to get all the incomes and the expenses.'})
    }finally{
        // Close connection
        await pool.end();
    }
}

// add new income / expense
export const addNewIncomeExpense = async (req, res, next) => {
    // Get the connection
    const pool = await connectDB();

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()})
    }

    // Get the current userID
    const { userID } = req.user;
    const { description, inExType, amount } = req.body;
    const { account } = req.params;
    try {
        // Find the account to be updated the amount
        let findAccountQuery = `SELECT "amount" FROM "userAccounts" WHERE "belongsTo" = ${userID} and "accountNumber" = '${account}'`;
        const resultAmountQuery = await pool.query(findAccountQuery);
        if(resultAmountQuery.rowCount === 0){
            return res.json({ msg: 'Account not found or incorrect account number.'});
        }
        // Create the new Income / expense
        let newIncomeExpense = `INSERT INTO "incomeExpense" ("description","inExType","amount","userBelongsTo","inAccBelongsTo") VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        let values = [description, inExType, amount, userID, account];
        const resultQuery = await pool.query(newIncomeExpense, values);

        if(resultQuery.rowCount === 0){
            return res.json({ msg: 'Unable to save your request.'})
        }
        
        // Create the corresponding logic to add
        let amountToUpdate = Number(resultAmountQuery.rows[0].amount);
        let newAmount = 0;
        
        if(inExType === 'Expense') {
            if(amount > amountToUpdate ){
                return res.json({ msg: 'Insufficient funds, amount should not be greater than your savings.', codeStatus: 2 }); // warning
            }
            newAmount = amountToUpdate - amount
        }

        if(inExType === 'Income'){
            newAmount = amountToUpdate + amount
        }

        let updatedQuery = `UPDATE "userAccounts" SET "amount" = ${newAmount} WHERE "belongsTo" = ${userID} AND "accountNumber" = '${account}' RETURNING *`;
        const resultUpdate = await pool.query(updatedQuery);
        
        if(resultUpdate.rowCount === 0){
            return res.json({ msg: 'Something went wrong, please contact use via phone.', codeStatus: 3 }); // 3 Error
        }

        return res.status(200).json({ msg: `Your ${inExType} was created correctly.`, data: resultQuery.rows[0], codeStatus: 1 }); // 1 Success

    } catch (error) {
        console.log(error, 'Unable to save your income or expense')
        res.status(500).json({ msg: 'Server error, unable to save your income/expense.'})
    }finally{
        // Close connection
        await pool.end();
    }
}