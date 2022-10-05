import { connectDB } from '../database/db';
import { generateToken } from '../helpers/generateToken';
import { validationResult } from 'express-validator';
import { sendMailConfirmation } from '../helpers/mailConfirmation';
import bcriptjs  from 'bcryptjs';

// controllers for user
export const createUser = async (req, res, next) => {

    const pool = await connectDB();
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(500).json({ errors: errors.array()})
    }
    try {
        const userToken = generateToken(); // Generate token for future validation via email
        // Extract values
        const { userName, userLastName, userEmail, userPassword } = req.body;

        // Validate that the user does not exist
        let query = `SELECT * FROM "userBudget" WHERE "userEmail" = '${userEmail}'`;

        const result = await pool.query(query);

        if(result.rowCount >= 1 ){
            return res.status(400).json({ msg: 'The email prvided has already been taken.'})
        }
        // Hashe the user password once we validate this is a new user
        const salt = await bcriptjs.genSalt(10);
        const hashPasword = await bcriptjs.hash(userPassword, salt);

        // Create the new user
        let createUserQuery = 'INSERT INTO "userBudget" ("userName", "userLastName", "userEmail", "userPassword", "userToken", "isAuthenticated") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';

        let values = [userName, userLastName, userEmail, hashPasword, userToken, '0' ];

        const newUser = await pool.query(createUserQuery, values);
        
        if(newUser.rowCount === 0 ){
            res.status(400).json({ msg: 'something went wrong while creating your account.'})
        }else {
            res.status(200).json({msg: 'Your account has created correctly, please check your email to confirm your account.'})
            const { userName, userEmail, userToken, userLastName } = newUser.rows[0];

            const msg = await sendMailConfirmation({
                name: userName,
                lastName: userLastName,
                email: userEmail,
                token: userToken,
            })
        }

    } catch (error) {
        console.log(error, 'unable to create the user.')
        res.status(500).json({ msg: 'Server error, try again later.'});
    }finally {
        await pool.end(); // Close the conection to DB
    }
}

// Check if the email is already taken
export const verifyUniqueEmail = async (req, res) => {

    // Db connection
    const pool = await connectDB();

    // Verify errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.json({ errors: errors.array() })
    }

    // Validate a valid email is provided
    const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

    // Extraact values
    const { email } = req.body;

    // Email validation
    if(!emailRegex.test(email)) {
        return res.json({ msg: 'Please enter a valid email.'})
    }

    let lowerEmail = email.toLowerCase();
    let queryEmail = `SELECT * FROM "userBudget" WHERE "userBudget"."userEmail" = '${lowerEmail}'`;
    try {
        const result = await pool.query(queryEmail);
        
        if(result.rowCount >= 1) {
            return res.json({ isTaken: 1, msg: 'Please choose a different email' })
        }

        return res.status(200).json({ isTaken: 0, msg: 'Valid email address'})
        
    } catch (error) {
        console.log(error, 'Server error, unable to complete your request')
        res.status(500).json({ msg: 'Server error, unable to complete your request'})
    }
}