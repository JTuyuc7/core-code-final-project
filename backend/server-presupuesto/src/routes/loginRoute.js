import { Router } from 'express';
import { check } from 'express-validator';
import { loginController } from '../controllers/loginController';

const router = Router();

router.post('/', 
    [
        check('userEmail', 'Email is required to login to your account').not().isEmpty().isEmail(),
        check('userPassword', 'Password is required to login').not().isEmpty()
    ],
    loginController
)

export default router;