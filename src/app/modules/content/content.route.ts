import express, { NextFunction, Request, Response } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { ContentValidation } from './content.validation';
import { multerUpload } from '../../config/multer.config';
import { ContentController } from './content.controller';

const router = express.Router();

router.post(
  '/create-content',
  multerUpload.single('file'), // Handle file upload
  (req: Request, res: Response, next: NextFunction) => {
    req.body = ContentValidation.createContentSchema.parse(
      JSON.parse(req.body.data),
    );
    return ContentController.creaateContent(req, res, next);
  },
);

router.get('/', ContentController.getAllContent);

export const ContentRoutes = router;
