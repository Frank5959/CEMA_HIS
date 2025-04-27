import { DbHelper } from "../databasehelpers/db.helper";
import { Program } from "../types/core";

export class ProgramService {
  // Create a new program via stored procedure, handling duplicates.

  async create(data: { name: string; description?: string }): Promise<Program> {
    try {
      const results = await DbHelper.callProcedure("CreateProgram", [
        data.name,
        data.description || null,
      ]);
      const inserted = results[0] as Program[];
      if (!inserted.length) throw new Error("Creation failed");
      return inserted[0];
    } catch (error: any) {
      // Handle duplicate entry error
      if (error.code === "ER_DUP_ENTRY") {
        throw new Error("Program with this name already exists");
      }
      // Re-throw other errors
      throw error;
    }
  }

  // List all programs via stored procedure.

  async list(): Promise<Program[]> {
    const results = await DbHelper.callProcedure("ListPrograms");
    return results[0] as Program[];
  }

  // Find a program by ID via stored procedure.
  async findById(id: string): Promise<Program | null> {
    const results = await DbHelper.callProcedure("GetProgramById", [id]);
    const programs = results[0] as Program[];
    return programs[0] || null;
  }
}
