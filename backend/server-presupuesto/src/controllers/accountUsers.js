
import { connectDB } from "../database/db";

export const getAllMyAccounts = async (req, res, next) => {

    const client = await connectDB();

    let query = `select * from "userBudget"`;
    let queryUser = `select * from "accountBudget" 
                        join "userBudget" 
                        on "userBudget"."userID" = "accountBudget"."accountBelongsTo" 
                        where "userBudget"."userID" = ${2}`;

    let query2 = `select * from "incomeExpenceBudget"
    join "accountBudget" ON
    "accountBudget"."accountNumber" = "incomeExpenceBudget"."inExAccBelongsTo"
    join "userBudget" on
    "userBudget"."userID" = "accountBudget"."accountBelongsTo" where "userBudget"."userID" = 1 and "incomeExpenceBudget"."inExAccBelongsTo" = '11111111' and "incomeExpenceBudget"."type" = 'Ingreso'`
    try {
        const res = await client.query(query2);

        console.log(res.rows, '656565656656')
        
    } catch (error) {
        console.log(error, 'Unable to get the response from query')
    }
} 