import { connectDB } from "../database/db";
import { generateAccountNumber } from "../helpers/generateAccountNumber";
import { validationResult } from "express-validator";


export const getAllTypeAccounts = async (req, res, next) => {
    // Connect DB
    const pool = await connectDB();

    // Get the user ID to get all the account belongs to the user
    const { userID } = req.user;
    let query = `SELECT * from "accountTypes"`;
    try {
        const resultAccounts = await pool.query(query);
        if(resultAccounts.rowCount === 0){
            return res.json({ msg: 'There is no accounts registered.', accountTypes: []})
        }

        return res.status(200).json({ msg: 'Account types', accounts: resultAccounts.rows })
    } catch (error) {
        console.log(error, 'unable to get all the account types')
    } finally {
        await pool.end();
    }
}

export const getAllBudgetAccounts = async (req, res, next) => {
    // Connect DB
    const pool = await connectDB();

    // Get the user ID to get all the account belongs to the user
    const { userID } = req.user;

    try {
        let queryAccounts = `SELECT "accountId", "accountNumber", "amount", "accountType", "createdAt" FROM "userAccounts" WHERE "belongsTo" = '${userID}'`;
        const resultAccounts = await pool.query(queryAccounts);
        
        if(resultAccounts.rowCount === 0){
            return res.json({ msg: 'You do not have accounts yet, start by creating one.', accounts: []})
        }
        return res.status(200).json({ msg: 'Your account list', accounts: resultAccounts.rows })
        
    } catch (error) {
        console.log(error, 'Unable to get your accounts information')
        res.status(500).json({ msg: 'Server error unable to complete your request.'})
    }finally{
        // Close the connection
        await pool.end();
    }
}

export const getSingleBudgetAccount = async (req, res, next) => {
    // DB connection
    const pool = await connectDB();
    // Get the account to search
    const { accountNumber } = req.params;
    // ID of user
    const { userID } = req.user;
    try {
        let querySingleAccount = `SELECT * FROM "userAccounts" WHERE "belongsTo" = ${userID} AND "accountNumber" = '${accountNumber}'`;
        const accountResult = await pool.query(querySingleAccount);
        if(accountResult.rowCount === 0){
            return res.json({ msg: 'Seems that the account you are looking for does not exist.'});
        }
        return res.status(200).json({ msg: 'Your account information', account: accountResult.rows[0]})
    } catch (error) {
        console.log(error, 'Unable to get your account information')
        res.status(500).json({ msg: 'Unable to get your account information.'})
    }finally {
        await pool.end(); // Close the connection
    }
}

export const createBudgetAccount = async (req, res, next) => {

    // Create connection to db
    const pool = await connectDB();
    // Validate errors on the request body
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    }
    // Extract values of request
    const { accountType, amount, currency } = req.body;
    // get the ID of the user logged in
    const { userID } = req.user;

    /*
    // User should have only one type of account
    let queryAccount = `SELECT * FROM "userAccounts" WHERE "belongsTo" = ${userID} AND "accountType" = '${accountType}'`;
    const hasAlreadyAccountType = await pool.query(queryAccount);

    if(hasAlreadyAccountType.rowCount === 1) {
        return res.json({ msg: `You have already a ${accountType} created, please select another type.`})
    }
    */ // ---------------------> TODO uncoment to be able to add only one type of account
    if(amount <= 0) {
        return res.json({ msg: 'Account should created with a positive amount or default 0'});
    }
    // Create the account number
    const accountNumber = generateAccountNumber();
    try {
        
        let query = `INSERT INTO "userAccounts" ("accountNumber","accountType",amount,"belongsTo",currency) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        let values = [accountNumber, accountType, amount, userID, currency];
        const result = await pool.query(query, values);
        if(result.rowCount === 0){
            res.json({ msg: 'Ops seems that we had an issue, try again later'});
        }else {
            return res.status(200).json({ msg: 'Your account has created correctly', account: result.rows[0] });
        }
    } catch (error) {
        console.log(error, 'unable to create you account')
        res.status(500).json({ msg: 'Server error, unable to create the account'})
    }finally {
        // Close the connection
        await pool.end();
    }
}