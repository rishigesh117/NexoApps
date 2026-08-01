/**
 * Download Controller
 * NexoApps Platform
 */

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

    // Headers for secure file download stream
    res.setHeader('Content-Type', 'application/vnd.android.package-archive');
    res.setHeader('Content-Disposition', `attachment; filename="${record.appSlug}-v${record.version}.apk"`);
    
    // Send standard mock APK buffer payload
    const mockApkBuffer = Buffer.from(`NEXOAPPS_APK_BINARY_STREAM_V${record.version}_${record.appSlug}`);
    return res.send(mockApkBuffer);
  } catch (err) {
    next(err);
  }
};
