import { Router } from 'express';
import { confirmAccount } from '../controllers/confirAccountController';

const router = Router();

router.get('/:token',
    confirmAccount
)

export default router;