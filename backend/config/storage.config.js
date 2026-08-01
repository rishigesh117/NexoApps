/**
 * Storage Abstraction Configuration (Local / AWS S3 Cloud Ready)
 * NexoApps Platform
 */

const path = require('path');

module.exports = {
  driver: process.env.STORAGE_TYPE || 'local', // 'local' | 's3'
  local: {
    uploadDir: path.join(__dirname, '../uploads'),
    maxFileSize: 100 * 1024 * 1024, // 100MB max APK / file size
  },
  s3: {
    bucket: process.env.AWS_S3_BUCKET || 'nexoapps-storage',
    region: process.env.AWS_REGION || 'us-east-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  },
};
