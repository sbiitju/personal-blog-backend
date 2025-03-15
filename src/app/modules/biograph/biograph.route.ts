import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { BiogaraphValidation } from './biograph.validation';
import { BiographController } from './biograph.controller';

const router = express.Router();

router.post(
  '/create-biograph',
  validateRequest(BiogaraphValidation.createBiographSchema),
  BiographController.createBiograph,
);

router.get('/:domain', BiographController.getBiograph);

router.put(
  '/:domain',
  validateRequest(BiogaraphValidation.updateBiographSchema),
  BiographController.updateBiograph,
);

export const BiographRoutes = router;
