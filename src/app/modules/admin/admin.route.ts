import express from 'express';
import { AdminControllers } from './admin.cotroller';

const router = express.Router();

router.get('/users', AdminControllers.getAllUsers);

router.put('/users/:id', AdminControllers.toggleUserDeletionStatus);

export const AdminRoutes = router;
