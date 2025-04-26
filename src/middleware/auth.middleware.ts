import { Request, Response, NextFunction } from "express";
import logger from "../helpers/logger.helper";

export const apiKeyAuth = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey || apiKey !== process.env.API_KEY) {
    logger.warn(`Unauthorized access attempt from IP: ${req.ip}`);
    return res.status(401).json({
      success: false,
      error: "Unauthorized - Invalid API Key",
    });
  }

  next();
};
