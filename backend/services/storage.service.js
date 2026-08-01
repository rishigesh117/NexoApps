/**
 * Cloud Storage Abstraction Layer
 * NexoApps Platform - Phase 4E
 */

const envConfig = require('../config/env.config');
const path = require('path');
const fs = require('fs');

class StorageService {
  constructor() {
    this.driver = envConfig.storage.driver; // 'local' | 's3' | 'r2' | 'gcp' | 'azure'
    this.bucket = envConfig.storage.bucket;
  }

  async uploadFile({ fileName, fileBuffer, mimeType, folder = 'apks' }) {
    if (this.driver === 'local') {
      const targetDir = path.join(process.cwd(), 'uploads', folder);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      const filePath = path.join(targetDir, fileName);
      fs.writeFileSync(filePath, fileBuffer);
      return {
        url: `/uploads/${folder}/${fileName}`,
        storagePath: filePath,
        provider: 'local',
      };
    }

    // Abstraction placeholders for Cloud Drivers (AWS S3, Cloudflare R2, GCP, Azure)
    return {
      url: `https://${this.bucket}.s3.amazonaws.com/${folder}/${fileName}`,
      storagePath: `${folder}/${fileName}`,
      provider: this.driver,
    };
  }

  async getSignedUrl(filePath, expirationMinutes = 30) {
    if (this.driver === 'local') {
      const token = Buffer.from(`${filePath}:${Date.now() + expirationMinutes * 60000}`).toString('base64');
      return `/api/v1/downloads/secure-file?token=${token}&file=${encodeURIComponent(filePath)}`;
    }

    return `https://${this.bucket}.s3.amazonaws.com/${filePath}?X-Amz-Expires=${expirationMinutes * 60}`;
  }
}

module.exports = new StorageService();
