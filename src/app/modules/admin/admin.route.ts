import express from 'express';  
import { AdminControllers } from './admin.cotroller';

const router = express.Router();

router.get('/users',  AdminControllers.getAllUsers);

export const AdminRoutes = router;
