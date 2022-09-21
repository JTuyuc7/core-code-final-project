import { connectDB } from '../database/db';
import { generateToken } from '../helpers/generateToken';
import { validationResult } from 'express-validator';
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

        if(result.rowCount === 1 ){
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
            res.status(200).json({msg: 'Your account has created correctly'})
        }

    } catch (error) {
        console.log(error, 'unable to create the user.')
    }finally {
        await pool.end(); // Close the conection to DB
    }
}