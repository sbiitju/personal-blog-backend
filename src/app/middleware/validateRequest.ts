import { AnyZodObject } from 'zod';
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsynch';

const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await schema.parseAsync(req.body);
    next();
  });
};

export default validateRequest;
