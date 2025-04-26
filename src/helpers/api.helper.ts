import { Response } from "express";
import { ApiResponse } from "../types/core";

export class ApiHelper {
  static success<T>(res: Response, data: T, statusCode = 200): void {
    const response: ApiResponse<T> = { success: true, data };
    res.status(statusCode).json(response);
  }

  static error(res: Response, error: string, statusCode = 500): void {
    const response: ApiResponse<never> = { success: false, error };
    res.status(statusCode).json(response);
  }

  static notFound(res: Response, message = "Resource not found"): void {
    const response: ApiResponse<never> = { success: false, error: message };
    res.status(404).json(response);
  }
}
