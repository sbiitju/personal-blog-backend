import express from 'express';
import { AdminControllers } from './admin.cotroller';

const router = express.Router();

router.get('/users', AdminControllers.getAllUsers);

router.put('/users/delete/:id', AdminControllers.toggleUserDeletionStatus);

router.put('/users/block/:id', AdminControllers.toggleUserDeletionStatus);

export const AdminRoutes = router;
