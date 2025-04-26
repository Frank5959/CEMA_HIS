import pool from "../config/database";
import logger from "../helpers/logger.helper";
import { PoolConnection, ResultSetHeader, RowDataPacket } from "mysql2/promise";

export class DbHelper {
  static async executeQuery<T extends RowDataPacket[]>(
    sql: string,
    params: any[] = []
  ): Promise<T> {
    const connection = await pool.getConnection();
    try {
      const [results] = await connection.query<T>(sql, params);
      return results;
    } catch (error) {
      logger.error("Query failed:", error);
      throw error;
    } finally {
      connection.release();
    }
  }

  static async executeCommand(
    sql: string,
    params: any[] = []
  ): Promise<ResultSetHeader> {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query<ResultSetHeader>(sql, params);
      return result;
    } catch (error) {
      logger.error("Command failed:", error);
      throw error;
    } finally {
      connection.release();
    }
  }

  static async callProcedure(
    procedureName: string,
    params: any[] = []
  ): Promise<RowDataPacket[][]> {
    const connection = await pool.getConnection();
    try {
      const [results] = await connection.query<RowDataPacket[][]>(
        `CALL ${procedureName}(?)`,
        [params]
      );
      return results;
    } catch (error) {
      logger.error("Procedure failed:", error);
      throw error;
    } finally {
      connection.release();
    }
  }
}
