const Jwt = require('jsonwebtoken');
const config = require('../settings');
const connectDB = require('../database/db');

const { secret_key_jwt } = config;

exports.validateTokenUser = async (req, res, next) => {
    const pool = await connectDB();
    const { token } = req.params;
    try {
        const decoded = Jwt.verify(token, secret_key_jwt);
        const userID = decoded.user.id;
        let queryUser = `SELECT "userID", "userName", "userLastName", "userEmail", "createdAt" FROM "userBudget" WHERE "userID" = ${userID} `;
        const result = await pool.query(queryUser);
        let user = {...result.rows[0]};
        res.status(200).json({ user: user, msg: 'Welcome back', result: { validate: 1, tokenExp: decoded.exp }  })
    } catch (error) {
        console.log(error, 'Unable to validate the token')
        res.status(500).json({ msg: 'Server error, unable to complete your request', validateCode: 0})
    }
    
}