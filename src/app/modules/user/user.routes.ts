import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();
// create political account
router.post('/create-client', UserController.createClientAccount);

export const UserRoutes = router;
