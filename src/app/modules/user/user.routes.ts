import express, { NextFunction, Request, Response } from 'express';
import { UserController } from './user.controller';
import { multerUpload } from '../../config/multer.config';
import { userValidation } from './user.validation';
import validateRequest from '../../middleware/validateRequest';

const router = express.Router();

router.post(
  '/create-client',
  multerUpload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.createClientSchema.parse(
      JSON.parse(req.body.data),
    );
    return UserController.createClientAccount(req, res, next);
  },
);

router.post(
  '/create-admin',
  (req, res, next) => {
    console.log(req.body);  
    next();
  },
  validateRequest(userValidation.createAdminSchema),
  UserController.createAdminAccount
);


export const UserRoutes = router;
