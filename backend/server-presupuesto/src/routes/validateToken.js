import { Router } from "express";
import { validateTokenUser } from "../controllers/validateTokenController";

const router = Router();

// Validate the token
router.get('/:token',
    validateTokenUser
)

export default router;