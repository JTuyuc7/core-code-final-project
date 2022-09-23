import { Router } from 'express';
import { createUser } from '../controllers/userController';
import { check } from 'express-validator';
const router = Router();

// Routes to create a new User
router.post('/', 
    // Validations here and connect to controller
    [
        check('userName', 'User name is a required field').not().isEmpty().trim(),
        check('userLastName', 'Last name is required field').not().isEmpty(),
        check('userEmail', 'Email is a required field').isEmail().normalizeEmail(),
        check('userPassword', 'Password is required and hast to be 6 min characters').isLength({ min: 6 }).not().isEmpty()
    ],
    createUser
);

export default router;