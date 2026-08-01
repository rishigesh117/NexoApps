/**
 * Logging Utility
 * NexoApps Platform
 */

const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logger = {
  info: (msg) => {
    console.log(`[INFO] [${new Date().toISOString()}]: ${msg}`);
  },
  warn: (msg) => {
    console.warn(`[WARN] [${new Date().toISOString()}]: ${msg}`);
  },
  error: (msg, err) => {
    console.error(`[ERROR] [${new Date().toISOString()}]: ${msg}`, err || '');
  },
};

module.exports = logger;
