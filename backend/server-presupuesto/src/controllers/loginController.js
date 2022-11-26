const connectDB = require('../database/db');
const { validationResult } = require('express-validator');
const bcript = require('bcryptjs');
const config = require('../settings');
const jwt = require('jsonwebtoken');

const { secret_key_jwt } = config;

exports.loginController = async (req, res, next) => {

    const pool = await connectDB(); // DB conection to get the pool

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(500).json({ errors: errors.array()})
    }
    // Extract values
    const { userEmail, userPassword } = req.body;

    try {
        
        let query = ` SELECT * FROM "userBudget" WHERE "userEmail" = '${userEmail}' `;
        const result = await pool.query(query);
        
        if(result.rowCount === 0){
            return res.json({ msg: 'Please verify you email address.', codeStatus: 2 }) // status code 2 warning
        }
        // Copy of the user founded
        const userFound = {...result.rows[0]};

        // Verify the user has its account verified
        if(userFound.userToken !== '' && userFound.isAuthenticated === '0'){
            console.log(userFound.userToken, ' validacion')
            return res.json({ msg: 'Please verify your account to continue!', codeStatus: 2});
        }

        // Verify that the password is correct
        const correctPassword = await bcript.compare( userPassword,  userFound.userPassword);
        if(!correctPassword){
            res.json({msg: 'Please verify your password to continue!', codeStatus: 2});
        }

        // payload to generate the jwt
        const payload = {
            user : {
                id: userFound.userID,
                userName: userFound.userName,
                userLastName: userFound.userLastName,
                // email ? 
            }
        }

         // Return data to login
        const userData = {};
        userData.userID = userFound.userID,
        userData.userName = userFound.userName,
        userData.userLastName = userFound.userLastName,
        userData.userEmail = userFound.userEmail,
        userData.createdAt = userFound.createdAt
        // Generate the JWT
        jwt.sign(payload, secret_key_jwt, {
            expiresIn: '12h', // Equivalent to one day // for development
            //expiresIn: 60 // 1 minute for test
        }, (error, token) => {
            if(error) throw error;

            // Token generated return the token and the user information
            res.status(200);
            res.json({ token: token, user: userData, msg: 'Login successfully', codeStatus: 1 });
        })

    } catch (error) {
        console.log(error, 'Unable to login ')
        res.sendSatatus(500).json({ msg: 'Unable to login to your account'})
    }finally {
        // Close the connection
        await pool.end();
    }
}