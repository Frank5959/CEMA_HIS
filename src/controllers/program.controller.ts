import { Request, Response } from "express";
import { ProgramService } from "../services/program.service";
import { ApiHelper } from "../helpers/api.helper";

// this controller handle program-related HTTP requests
const programService = new ProgramService();

export class ProgramController {
  // Create a new program
  async createProgram(req: Request, res: Response) {
    try {
      const program = await programService.create(req.body);
      ApiHelper.success(res, program, 201);
    } catch (err: any) {
      console.error(err);
      const message = err.message || "Failed to create program";
      // Handle duplicate error as bad request
      const statusCode = message.includes("exists") ? 400 : 500;
      ApiHelper.error(res, message, statusCode);
    }
  }
  // List all programs
  async listPrograms(_req: Request, res: Response) {
    try {
      const programs = await programService.list();
      ApiHelper.success(res, programs);
    } catch (err) {
      console.error(err);
      ApiHelper.error(res, "Failed to list programs");
    }
  }
  // Get a single program by ID
  async getProgram(req: Request, res: Response) {
    try {
      const program = await programService.findById(req.params.id);
      if (!program) return ApiHelper.notFound(res, "Program not found");
      ApiHelper.success(res, program);
    } catch (err) {
      console.error(err);
      ApiHelper.error(res, "Failed to retrieve program");
    }
  }
}
