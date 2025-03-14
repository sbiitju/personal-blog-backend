import express, { NextFunction, Request, Response } from 'express';
import { ClientController } from './political.controller';

const router = express.Router();

router.get('/:domain', ClientController.getClientInfo);

export const ClientRoutes = router;
