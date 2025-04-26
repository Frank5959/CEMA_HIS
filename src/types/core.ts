import { RowDataPacket } from "mysql2/promise";

export interface Client extends RowDataPacket {
  id: string;
  name: string;
  contact_info: string;
  created_at: Date;
  updated_at: Date;
}

export interface Enrollment extends RowDataPacket {
  client_id: string;
  program_id: string;
  enrolled_at: Date;
}

export interface Program extends RowDataPacket {
  id: string;
  name: string;
  description?: string;
  created_at: Date;
  updated_at: Date;
}

// For enrollment result
export interface EnrolledProgram extends RowDataPacket {
  program_id: string;
  program_name: string;
  enrolled_at: Date;
}

export interface ApiResponse<T = undefined> {
  success: boolean;
  data?: T;
  error?: string;
}
