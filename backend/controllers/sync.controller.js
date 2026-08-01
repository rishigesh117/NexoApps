/**
 * Cloud Sync Controller
 * NexoApps Platform - Phase 5C
 */

const cloudSyncService = require('../services/cloud_sync.service');

exports.startSync = async (req, res, next) => {
  try {
    const userId = req.user?.id || 'usr-1';
    const { syncType, deviceId } = req.body;
    const session = cloudSyncService.startSync(userId, syncType || 'incremental', deviceId);
    return res.status(200).json({ success: true, data: session });
  } catch (err) { next(err); }
};

exports.getSyncStatus = async (req, res, next) => {
  try {
    const userId = req.user?.id || 'usr-1';
    const status = cloudSyncService.getSyncStatus(userId);
    return res.status(200).json({ success: true, data: status });
  } catch (err) { next(err); }
};

exports.getSyncHistory = async (req, res, next) => {
  try {
    const userId = req.user?.id || 'usr-1';
    const history = cloudSyncService.getSyncHistory(userId);
    return res.status(200).json({ success: true, data: history });
  } catch (err) { next(err); }
};
