import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constance';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.loginUser,
);

// chnage password
router.post(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.technical, USER_ROLE.political),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthController.changePassword,
);

export const AuthRoutes = router;
