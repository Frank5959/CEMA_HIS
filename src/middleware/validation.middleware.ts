import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { ApiHelper } from "../helpers/api.helper";

export const validateClientCreation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(255).required(),
    contact_info: Joi.string().email().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return ApiHelper.error(res, error.details[0].message, 400);
  next();
};

export const validateProgramCreation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(100).required(),
    description: Joi.string().allow("", null),
  });
  const { error } = schema.validate(req.body);
  if (error) return ApiHelper.error(res, error.details[0].message, 400);
  next();
};
