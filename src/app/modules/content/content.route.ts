import express, { NextFunction, Request, Response } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { ContentValidation } from './content.validation';
import { multerUpload } from '../../config/multer.config';
import { ContentController } from './content.controller';

const router = express.Router();

router.post(
  '/create-content',
  multerUpload.single('file'),  
  (req: Request, res: Response, next: NextFunction) => {
    req.body = ContentValidation.createContentSchema.parse(
      JSON.parse(req.body.data),
    );
    return ContentController.creaateContent(req, res, next);
  },
);

router.put(
  '/:id',
  multerUpload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = ContentValidation.updateContentSchema.parse(
      JSON.parse(req.body.data),
    );
    return ContentController.updateContent(req, res, next);
  },
);

router.get('/', ContentController.getAllContent);

router.get('/domain/:domain', ContentController.getContentByDomain);

router.get('/category/:category', ContentController.getContentByCategory);

router.get(
  '/category/:category/domain/:domain',
  ContentController.getContentByCategoryAndDomain,
);

router.get(
  '/subcategory/:subcategory',
  ContentController.getContentBySubcategory,
);

router.get(
  '/subcategory/:subcategory/domain/:domain',
  ContentController.getContentBySubcategoryAndDomain,
);

router.get('/:id', ContentController.getContentById);

router.delete('/:id', ContentController.deleteContentById);

export const ContentRoutes = router;
