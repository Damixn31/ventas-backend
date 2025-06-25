import express from 'express';
import { 
   login,
   registerUser,
   logout,
   getMe,
} from '../controllers/auth.controllers.js';

import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', registerUser);
router.post('/logout', logout);
router.get('/me', verifyToken, getMe);

export default router;
