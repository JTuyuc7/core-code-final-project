import Jwt from "jsonwebtoken";
import { connectDB } from "../database/db";
import config from '../settings';

const { secret_key_jwt } = config;

export const checkAuthUser = async (req, res, next) => {
    const pool = await connectDB();
    let token;

    //console.log(req.headers, 'headers encontrar bearer')
    if( req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = Jwt.verify( token, secret_key_jwt);
            let userID = decoded.user.id;
            let queryUser = `SELECT "userID", "userName", "userLastName", "userEmail" FROM "userBudget" WHERE "userID" = ${userID} `;
            const result = await pool.query(queryUser);
            const user = {...result.rows[0]};
            req.user = user;
            return next();
        } catch (error) {
            return res.status(404).json({ msg: 'Your session has expired, please log in again.'})
        }
    }

    if(!token){
        return res.status(401).json({ msg: 'Invalid token, please try again later'});
    }

    next();
}