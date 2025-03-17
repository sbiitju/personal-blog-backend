import express from 'express';
import { multerUpload } from '../../config/multer.config';
import { BannerController } from './banner.controller';

const router = express.Router();

router.post(
  '/create-banner',
  multerUpload.single('file'),
  BannerController.createBanner,
);

export const BannerRoutes = router;
