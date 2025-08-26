import express from 'express';
import { PoliticalController } from './political.controller';
import { multerUpload } from '../../config/multer.config';
import auth from '../../middleware/auth'; 
import validateRequest from '../../middleware/validateRequest';
import { politicalValidation } from './political.validation';
import { USER_ROLE } from '../user/user.constance';

const router = express.Router();

// Get logged political user profile
router.get(
  '/profile',
  auth(USER_ROLE.political),
  PoliticalController.getLoggedPoliticalUser
);

// Update political user profile
router.patch(
  '/profile',
  auth(USER_ROLE.political),
  multerUpload.single('file'),
  validateRequest(politicalValidation.updatePoliticalProfileSchema),
  PoliticalController.updatePoliticalProfile
);

// Get political user by domain (public route)
router.get(
  '/domain/:domain',
  validateRequest(politicalValidation.getPoliticalByDomainSchema),
  PoliticalController.getPoliticalByDomain
);

// Get all political users (admin only)
router.get(
  '/',
  auth(USER_ROLE.admin),
  PoliticalController.getAllPoliticalUsers
);

// Delete political user (admin only)
router.delete(
  '/profile',
  auth(USER_ROLE.political),
  PoliticalController.deletePoliticalUser
);

export const PoliticalRoutes = router;
