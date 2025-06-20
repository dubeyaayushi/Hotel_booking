import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import { getUsers, getUser, updateUser, deleteUser } from '../controllers/users.js';

const router = express.Router();

router.use(protect);

router.get('/', authorize('admin'), getUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;