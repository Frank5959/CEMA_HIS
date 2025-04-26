import { RowDataPacket } from "mysql2/promise";

export interface Client extends RowDataPacket {
  id: string;
  name: string;
  contact_info: string; // Match database column names
  created_at: Date;
  updated_at: Date;
}

export interface Program extends RowDataPacket {
  id: string;
  name: string;
  description?: string;
  created_at: Date;
  updated_at: Date;
}
export interface Enrollment extends RowDataPacket {
  client_id: string;
  program_id: string;
  enrolled_at: Date;
}

export type ApiResponse<T = undefined> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

// Optional: Type utilities
export type CreateClientDTO = Omit<Client, "id" | "created_at" | "updated_at">;
export type CreateProgramDTO = Omit<
  Program,
  "id" | "created_at" | "updated_at"
>;
