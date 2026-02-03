import mysql from "mysql2/promise";

// DB connection configuration
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  waitForConnections: true,
  connectionLimit: 5, // Reduced limit to be safe with shared DBs
  queueLimit: 0,
  ssl: process.env.DB_HOST !== "localhost" ? { rejectUnauthorized: false } : undefined,
  connectTimeout: 20000,
};

// Singleton pattern to prevent connection exhaustion in development
const globalForDb = globalThis as unknown as {
  pool: mysql.Pool | undefined;
};

const pool = globalForDb.pool ?? mysql.createPool(dbConfig);

if (process.env.NODE_ENV !== "production") {
  globalForDb.pool = pool;
}

export default pool;
