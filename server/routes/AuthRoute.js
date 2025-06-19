import express from 'express';
import { register, login, getMe } from '../controllers/auth.js';
import { protect } from '../middleware/Auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);

export default router;