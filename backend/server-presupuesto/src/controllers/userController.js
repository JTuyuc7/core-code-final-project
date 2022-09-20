import { connectDB } from '../database/db';

// controllers for user
export const createUser = async (req, res, next) => {

    const pool = await connectDB();
    let query = `select * from "userBudget"`;
    try {
        const result = await pool.query(query);
        res.json(result.rows)

    } catch (error) {
        console.log(error, 'unable to get the data')
    }
}