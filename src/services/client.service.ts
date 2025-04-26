import { DbHelper } from "../databasehelpers/db.helper";
import { Client, EnrolledProgram, Enrollment } from "../types/core";
import { ProgramService } from "./program.service";

export class ClientService {
  async create(data: { name: string; contact_info: string }): Promise<Client> {
    const results = await DbHelper.callProcedure("CreateClient", [
      data.name,
      data.contact_info,
    ]);
    const inserted = results[0] as Client[];
    if (!inserted.length) throw new Error("Creation failed");
    return inserted[0];
  }

  async findById(id: string): Promise<Client | null> {
    const rows = await DbHelper.executeQuery<Client[]>(
      "SELECT * FROM clients WHERE id = ?",
      [id]
    );
    return rows[0] || null;
  }

  async getEnrollments(clientId: string): Promise<EnrolledProgram[]> {
    const results = await DbHelper.callProcedure("GetClientEnrollments", [
      clientId,
    ]);
    return results[0] as EnrolledProgram[];
  }

  async search(term: string): Promise<Client[]> {
    const wildcard = `%${term}%`;
    return DbHelper.executeQuery<Client[]>(
      "SELECT * FROM clients WHERE name LIKE ? OR contact_info LIKE ? ORDER BY created_at DESC",
      [wildcard, wildcard]
    );
  }

  async enroll(clientId: string, programId: string): Promise<Enrollment[]> {
    // Pre-check client existence
    const client = await this.findById(clientId);
    if (!client) {
      throw new Error("Client not found");
    }

    // Pre-check program existence
    const programService = new ProgramService();
    const program = await programService.findById(programId);
    if (!program) {
      throw new Error("Program not found");
    }

    // Proceed with enrollment
    const results = await DbHelper.callProcedure("EnrollClient", [
      clientId,
      programId,
    ]);
    return results[0] as Enrollment[];
  }
}
