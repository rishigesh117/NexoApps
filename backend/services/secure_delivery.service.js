/**
 * Secure APK Delivery & Download Architecture Service
 * NexoApps Platform - Phase 4E
 */

const crypto = require('crypto');
const envConfig = require('../config/env.config');
const storageService = require('./storage.service');

class SecureDeliveryService {
  constructor() {
    this.downloadLogs = [];
  }

  generateDownloadToken(userId, appId, filePath) {
    const expiresAt = Date.now() + envConfig.download.signedUrlExpirationMinutes * 60 * 1000;
    const payload = `${userId}:${appId}:${filePath}:${expiresAt}`;
    const signature = crypto.createHmac('sha256', envConfig.jwt.secret).update(payload).digest('hex');

    const token = Buffer.from(JSON.stringify({ userId, appId, filePath, expiresAt, signature })).toString('base64');
    return {
      token,
      expiresAt: new Date(expiresAt).toISOString(),
    };
  }

  verifyDownloadToken(token) {
    try {
      const decodedStr = Buffer.from(token, 'base64').toString('utf8');
      const { userId, appId, filePath, expiresAt, signature } = JSON.parse(decodedStr);

      if (Date.now() > expiresAt) {
        return { valid: false, reason: 'Download token has expired' };
      }

      const payload = `${userId}:${appId}:${filePath}:${expiresAt}`;
      const expectedSignature = crypto.createHmac('sha256', envConfig.jwt.secret).update(payload).digest('hex');

      if (signature !== expectedSignature) {
        return { valid: false, reason: 'Invalid token signature' };
      }

      return { valid: true, userId, appId, filePath };
    } catch {
      return { valid: false, reason: 'Malformed download token' };
    }
  }

  logDownload({ userId, appId, ip, userAgent }) {
    const log = {
      id: `dl-log-${Date.now()}`,
      userId,
      appId,
      ip,
      userAgent,
      timestamp: new Date().toISOString(),
    };
    this.downloadLogs.unshift(log);
    return log;
  }

  calculateChecksum(buffer) {
    return crypto.createHash('sha256').update(buffer).digest('hex');
  }
}

module.exports = new SecureDeliveryService();
