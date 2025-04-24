import path from "path";
import dotenv from "dotenv";
import mysql from "mysql2/promise"; // Use promise-based MySQL client

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
