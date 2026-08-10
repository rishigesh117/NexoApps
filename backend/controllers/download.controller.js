/**
 * Download Controller
 * NexoApps Platform
 */

const path = require('path');
const fs = require('fs');
const { successResponse, errorResponse } = require('../utils/responseHandler');
const downloadService = require('../services/download.service');

exports.initiateDownload = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const userId = req.user ? req.user.id : null;
    const metadata = {
      deviceInfo: req.headers['user-agent'] || 'Desktop Browser',
      ipAddress: req.ip || req.connection.remoteAddress || '127.0.0.1',
    };

    const record = downloadService.initiateDownload(userId, slug, metadata);
    return successResponse(res, record, 'Download initiated successfully');
  } catch (err) {
    next(err);
  }
};

exports.getDownloadHistory = async (req, res, next) => {
  try {
    const userId = req.user ? req.user.id : null;
    const history = downloadService.getUserDownloadHistory(userId);
    return successResponse(res, history, 'Fetched download history successfully');
  } catch (err) {
    next(err);
  }
};

exports.getDownloadById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const record = downloadService.getDownloadById(id);
    if (!record) {
      return errorResponse(res, 'Download record not found', 404);
    }
    return successResponse(res, record, 'Fetched download details successfully');
  } catch (err) {
    next(err);
  }
};

exports.streamDownloadFile = async (req, res, next) => {
  try {
    const { token } = req.params;
    const record = downloadService.getDownloadByToken(token);
    if (!record) {
      return errorResponse(res, 'Invalid or expired download token', 403);
    }

    downloadService.updateStatus(record.id, 'Completed');

    // Resolve the APK filename from the download record
    const apkFileName = record.downloadUrl
      ? record.downloadUrl.replace(/^\/downloads\//, '')
      : `${record.appSlug}-v${record.version}.apk`;
    const filePath = path.join(__dirname, '..', 'uploads', apkFileName);

    // Headers for secure file download stream
    res.setHeader('Content-Type', 'application/vnd.android.package-archive');
    res.setHeader('Content-Disposition', `attachment; filename="${apkFileName}"`);

    // Stream the actual APK file from uploads directory
    if (fs.existsSync(filePath)) {
      const stat = fs.statSync(filePath);
      res.setHeader('Content-Length', stat.size);
      return fs.createReadStream(filePath).pipe(res);
    } else {
      // APK file not found on server — return clear error
      return errorResponse(res, 'APK file not found on server. Please contact support or re-upload the APK file.', 404);
    }
  } catch (err) {
    next(err);
  }
};

