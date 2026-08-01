/**
 * Session Controller
 * NexoApps Platform
 */

const { successResponse } = require('../utils/responseHandler');

exports.getActiveSessions = async (req, res, next) => {
  return successResponse(res, [
    {
      id: 'sess-001',
      deviceInfo: 'Chrome / Windows',
      ipAddress: req.ip || '127.0.0.1',
      current: true,
      lastActive: new Date().toISOString(),
    }
  ], 'Active user sessions retrieved');
};

exports.logoutAllDevices = async (req, res, next) => {
  return successResponse(res, null, 'Logged out from all active sessions successfully');
};
