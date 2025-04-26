import { Request, Response, NextFunction } from "express";
import { logger } from "../helpers/logger.helper";

export const apiKeyAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const apiKey = req.header("x-api-key");
  if (!apiKey || apiKey !== process.env.API_KEY) {
    logger.warn(`Unauthorized attempt: ${req.ip}`);
    res.status(401).json({ success: false, error: "Invalid API Key" });
    return;
  }
  next();
};
