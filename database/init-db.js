/**
 * NexoApps Platform - Database Initialization & Migration Runner
 * Automatically creates database if missing and runs all SQL schemas in order.
 */

const fs = require('fs');
const path = require('path');

// Try loading dotenv from root or backend
const envPath = path.join(__dirname, '../.env');
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, 'utf8').split('\n');
  lines.forEach(line => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || '';
      if (value.length > 0 && value.charAt(0) === '"' && value.charAt(value.length - 1) === '"') {
        value = value.replace(/^"|"$/g, '');
      }
      process.env[key] = value.trim();
    }
  });
}

let Client;
try {
  Client = require('pg').Client;
} catch (e) {
  try {
    Client = require(path.join(__dirname, '../backend/node_modules/pg')).Client;
  } catch (err) {
    console.error('❌ Could not find pg module. Please run npm install in backend.');
    process.exit(1);
  }
}

const config = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '12345',
};

const targetDb = process.env.DB_NAME || 'nexoapps_db';

async function initDatabase() {
  console.log('🚀 Starting NexoApps Database Setup...');
  console.log(`Connecting to PostgreSQL as user "${config.user}" on ${config.host}:${config.port}...`);
  
  // 1. Connect to default postgres database to check/create target database
  let rootClient = new Client({ ...config, database: 'postgres' });
  try {
    await rootClient.connect();
    const res = await rootClient.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [targetDb]);
    if (res.rowCount === 0) {
      console.log(`📦 Creating database "${targetDb}"...`);
      await rootClient.query(`CREATE DATABASE "${targetDb}"`);
      console.log(`✅ Database "${targetDb}" created successfully.`);
    } else {
      console.log(`ℹ️ Database "${targetDb}" already exists.`);
    }
  } catch (err) {
    console.error('❌ Error connecting to PostgreSQL:', err.message);
    process.exit(1);
  } finally {
    await rootClient.end();
  }

  // 2. Connect to nexoapps_db database to execute schema and seed files
  const dbClient = new Client({ ...config, database: targetDb });
  try {
    await dbClient.connect();
    console.log(`⚡ Connected to "${targetDb}". Applying schema definitions...`);

    const schemaDir = path.join(__dirname, 'schema');
    const files = fs.readdirSync(schemaDir)
      .filter(file => file.endsWith('.sql'))
      .sort();

    let count = 0;
    for (const file of files) {
      const filePath = path.join(schemaDir, file);
      let sql = fs.readFileSync(filePath, 'utf8');
      
      // Transform CREATE TYPE into safe block if needed
      sql = sql.replace(/CREATE TYPE\s+([a-zA-Z0-9_]+)\s+AS\s+ENUM\s*\(([^;]+)\);/g, (match, typeName, enumValues) => {
        return `DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = '${typeName}') THEN CREATE TYPE ${typeName} AS ENUM (${enumValues}); END IF; END $$;`;
      });

      if (sql.trim()) {
        try {
          await dbClient.query(sql);
          count++;
        } catch (queryErr) {
          // If duplicate object/type or table already exists, continue gracefully
          if (queryErr.code === '42710' || queryErr.code === '42P07' || queryErr.message.includes('already exists')) {
            count++;
          } else {
            console.warn(`  ⚠️ Warning in ${file}: ${queryErr.message}`);
          }
        }
      }
    }
    console.log(`✅ ${count} schema files processed successfully.`);

    // 3. Run seeds if available
    const seedsDir = path.join(__dirname, 'seeds');
    if (fs.existsSync(seedsDir)) {
      const seedFiles = fs.readdirSync(seedsDir)
        .filter(file => file.endsWith('.sql'))
        .sort();

      for (const file of seedFiles) {
        const filePath = path.join(seedsDir, file);
        const sql = fs.readFileSync(filePath, 'utf8');
        if (sql.trim()) {
          try {
            await dbClient.query(sql);
            console.log(`✅ Seed applied: ${file}`);
          } catch (seedErr) {
            console.warn(`  ⚠️ Seed warning (${file}): ${seedErr.message}`);
          }
        }
      }
    }

    console.log('\n🎉 Database setup and all schemas initialized successfully!');
  } catch (err) {
    console.error('\n❌ Migration execution failed:', err.message);
    process.exit(1);
  } finally {
    await dbClient.end();
  }
}

initDatabase();
