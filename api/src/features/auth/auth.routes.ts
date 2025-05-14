import express from 'express';
import {
    loginUser,
    validateUserSession,
    registerUser,
    refreshUserSession,
} from '@/features/auth/auth.controller.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/validate-session', validateUserSession);
router.get('/refresh-session', refreshUserSession);

export default router;
