import { Client, Program, Enrollment } from "../types/core";

export interface IClientModel {
  create(
    client: Omit<Client, "id" | "createdAt" | "updatedAt">
  ): Promise<Client>;
  findById(id: string): Promise<Client | null>;
  search(searchTerm: string): Promise<Client[]>;
  getEnrollments(clientId: string): Promise<Program[]>;
}

export interface IProgramModel {
  create(name: string): Promise<Program>;
  findById(id: string): Promise<Program | null>;
}

export interface IEnrollmentModel {
  enroll(clientId: string, programId: string): Promise<Enrollment>;
}
