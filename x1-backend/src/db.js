import pkg from "pg";
const { Pool } = pkg;

// Create a connection pool to Postgres on Railway
const pool = new Pool({
connectionString: process.env.DATABASE_URL,
});

// Export it as the default export so "import db from './db.js'" works
export default pool;
