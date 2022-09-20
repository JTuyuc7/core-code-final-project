import { Router } from 'express';
import { createUser } from '../controllers/userController';
const router = Router();

// Routes to create a new User
router.get('/', 
    // Validations here and connect to controller
    createUser
);

export default router;