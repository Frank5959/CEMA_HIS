import mysql from "mysql2/promise";
import logger from "../helpers/logger.helper";

export class DbHelper {
  private static instance: DbHelper;
  private pool: mysql.Pool;

  private constructor() {
    this.validateEnv();
    this.pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      namedPlaceholders: true,
    });
  }

  public static getInstance(): DbHelper {
    if (!DbHelper.instance) {
      DbHelper.instance = new DbHelper();
    }
    return DbHelper.instance;
  }

  private validateEnv(): void {
    const requiredEnvVars = ["DB_HOST", "DB_USER", "DB_PASSWORD", "DB_NAME"];

    requiredEnvVars.forEach((varName) => {
      if (!process.env[varName]) {
        throw new Error(`Missing required environment variable: ${varName}`);
      }
    });
  }

  async executeProcedure<T extends mysql.ResultSetHeader>(
    procedureName: string,
    params: Record<string, any>
  ): Promise<T> {
    const connection = await this.pool.getConnection();

    try {
      const [results] = await connection.query<T[]>({
        sql: `CALL ${procedureName}(:${Object.keys(params).join(", :")})`,
        values: params,
        namedPlaceholders: true,
      });

      return results[0];
    } catch (error) {
      logger.error(`Procedure ${procedureName} failed:`, error);
      throw new Error(`Database operation failed: ${(error as Error).message}`);
    } finally {
      connection.release();
    }
  }

  async healthCheck(): Promise<boolean> {
    try {
      await this.pool.query("SELECT 1");
      return true;
    } catch (error) {
      return false;
    }
  }
}
