import { connectDB } from "../database/db";

async function checkValidToken (token) {
    const pool = await connectDB();
    // Get the user with the token to authenticate
    let query = `select * from "userBudget" where "userToken" = '${token}'`;
    let result = await pool.query(query);
    if(result.rowCount === 0){
        return { value: false, user: {} }
    }
    return { value: true, user: result.rows[0]}
}

export const confirmAccount = async (req, res, next) => {

    // get the token from teh params url
    const { token } = req.params;
    const pool = await connectDB();

    try {
        const dataUser = await checkValidToken(token);

        if(dataUser.value){
            // Update the field of the columns to verify the user.
            const tempUser = {...dataUser.user}
            let queryUpdate = ` UPDATE "userBudget" SET "userToken" = '', "isAuthenticated" = '1' WHERE "userID" = ${tempUser.userID} RETURNING *`;
            await pool.query(queryUpdate);
            return res.json({ msg: 'Your account has been verified correctly'})
        }else {
            return res.json({ msg: 'Token does not exist or it is not longer valid.'})
        }

    } catch (error) {
        console.log(error, 'Error while validation the account');

        res.send(500).json({ msg: 'Server error, unable to confirm the account.'})
    }finally {
        await pool.end()
    }

}