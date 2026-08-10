/**
 * Download Service Layer
 * NexoApps Platform
 */

const crypto = require('crypto');
const appService = require('./app.service');

class DownloadService {
  constructor() {
    this.downloads = [];
  }

  // Initiate a new download for authenticated user
  initiateDownload(userId, appSlug, metadata = {}) {
    const app = appService.getAppBySlug(appSlug);
    if (!app) {
      throw new Error('Application not found');
    }

    // Increment public download counter
    app.downloadsCount = (app.downloadsCount || 0) + 1;
    app.downloads = app.downloadsCount;

    // Generate secure temporary signed token
    const tokenPayload = `${userId}:${app.id}:${Date.now()}`;
    const downloadToken = crypto.createHash('sha256').update(tokenPayload).digest('hex');

    const downloadRecord = {
      id: `dl-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      userId: userId || 'guest-id',
      appId: app.id,
      appSlug: app.slug,
      appTitle: app.title,
      iconUrl: app.iconUrl,
      tagline: app.tagline,
      version: app.version,
      fileSize: app.fileSize || app.apkSize || '42 MB',
      downloadToken,
      deviceInfo: metadata.deviceInfo || 'Chrome on Desktop',
      browser: metadata.browser || 'Chrome',
      os: metadata.os || 'Desktop',
      ipAddress: metadata.ipAddress || '127.0.0.1',
      status: 'Queued',
      createdAt: new Date().toISOString(),
      downloadUrl: app.downloadUrl || `/downloads/${app.apkFile || 'app.apk'}`,
    };

    this.downloads.unshift(downloadRecord);
    return downloadRecord;
  }

  // Get user's download history
  getUserDownloadHistory(userId) {
    return this.downloads.filter((d) => d.userId === userId);
  }

  // Get download by ID
  getDownloadById(id) {
    return this.downloads.find((d) => d.id === id);
  }

  // Validate download token
  getDownloadByToken(token) {
    return this.downloads.find((d) => d.downloadToken === token);
  }

  // Update download status
  updateStatus(id, status) {
    const record = this.getDownloadById(id);
    if (record) {
      record.status = status;
      if (status === 'Completed') {
        record.completedAt = new Date().toISOString();
      }
    }
    return record;
  }
}

module.exports = new DownloadService();
