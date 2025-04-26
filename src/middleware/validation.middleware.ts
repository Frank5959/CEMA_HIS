import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { ApiHelper } from "../helpers/api.helper";

export const validateClientCreation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    contactInfo: Joi.string().email().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return ApiHelper.error(res, error.details[0].message, 400);
  }

  next();
};

export const validateProgramCreation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    description: Joi.string().optional(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return ApiHelper.error(res, error.details[0].message, 400);
  }

  next();
};
