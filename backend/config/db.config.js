/**
 * PostgreSQL Database Connection Configuration Blueprint
 * NexoApps Platform
 */

const { Pool } = require('pg');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  database: process.env.DB_NAME || 'nexoapps_db',
  user: process.env.DB_USER || 'nexoapps_admin',
  password: process.env.DB_PASSWORD || 'supersecretpassword',
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  max: 20, // Pool connection limit
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

// Database pool stub
const pool = new Pool(dbConfig);

pool.on('error', (err) => {
  console.error('Unexpected error on idle database client', err);
});

module.exports = {
  pool,
  query: (text, params) => pool.query(text, params),
};
