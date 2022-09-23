import { Router } from "express";
import { getAllBudgetAccounts, getSingleBdgetAccount } from "../controllers/budgetController";

const router = Router();

router.get('/all-accounts',
    getAllBudgetAccounts,
)

router.get('/single-account/:id', 
    getSingleBdgetAccount
)

export default router;