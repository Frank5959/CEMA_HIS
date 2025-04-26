import { RowDataPacket } from "mysql2";
import { DbHelper } from "../databasehelpers/db.helper";

interface Client extends RowDataPacket {
  id: string;
  name: string;
  contact_info: string;
}

export class ClientService {
  static async createClient(name: string, contactInfo: string) {
    const result = await DbHelper.executeCommand(
      "INSERT INTO clients (name, contact_info) VALUES (?, ?)",
      [name, contactInfo]
    );

    const [client] = await DbHelper.executeQuery<Client[]>(
      "SELECT * FROM clients WHERE id = ?",
      [result.insertId]
    );

    return client;
  }

  static async searchClients(searchTerm: string) {
    return DbHelper.executeQuery<Client[]>(
      "SELECT * FROM clients WHERE name LIKE ?",
      [`%${searchTerm}%`]
    );
  }
}
