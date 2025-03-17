import express from 'express';
import { multerUpload } from '../../config/multer.config';
import { BannerController } from './banner.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constance';

const router = express.Router();

router.post(
  '/create-banner',
  multerUpload.single('file'),
  BannerController.createBanner,
);

router.delete(
  '/:id',
  auth(USER_ROLE.political, USER_ROLE.admin, USER_ROLE.technical),
  BannerController.deleteBanner,
);

export const BannerRoutes = router;
