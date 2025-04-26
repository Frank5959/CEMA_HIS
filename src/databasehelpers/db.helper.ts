import pool from "../config/database";
import { RowDataPacket, ResultSetHeader } from "mysql2/promise";

export class DbHelper {
  static async executeQuery<T extends RowDataPacket[]>(
    sql: string,
    params: any[] = []
  ): Promise<T> {
    const conn = await pool.getConnection();
    try {
      const [rows] = await conn.query<T>(sql, params);
      return rows;
    } finally {
      conn.release();
    }
  }

  static async executeCommand(
    sql: string,
    params: any[] = []
  ): Promise<ResultSetHeader> {
    const conn = await pool.getConnection();
    try {
      const [result] = await conn.query<ResultSetHeader>(sql, params);
      return result;
    } finally {
      conn.release();
    }
  }

  static async callProcedure(
    procedureName: string,
    params: any[] = []
  ): Promise<RowDataPacket[][]> {
    const conn = await pool.getConnection();
    try {
      const placeholders = params.map(() => "?").join(", ");
      const [results] = await conn.query<RowDataPacket[][]>(
        `CALL ${procedureName}(${placeholders})`,
        params
      );
      return results;
    } finally {
      conn.release();
    }
  }
}
