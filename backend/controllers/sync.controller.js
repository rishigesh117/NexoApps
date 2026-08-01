/**
 * Cloud Sync Controller
 * NexoApps Platform - Phase 5C
 */

const cloudSyncService = require('../services/cloud_sync.service');

exports.startSync = async (req, res, next) => {
  try {
    const { syncType } = req.body;
    const session = cloudSyncService.startSync(req.user?.id, syncType);
    return res.status(200).json({
      success: true,
      data: session,
    });
  } catch (err) {
    next(err);
  }
};

exports.getSyncStatus = async (req, res, next) => {
  try {
    const status = cloudSyncService.getSyncStatus(req.user?.id);
    return res.status(200).json({
      success: true,
      data: status,
    });
  } catch (err) {
    next(err);
  }
};

exports.getSyncHistory = async (req, res, next) => {
  try {
    const history = cloudSyncService.getSyncHistory(req.user?.id);
    return res.status(200).json({
      success: true,
      data: history,
    });
  } catch (err) {
    next(err);
  }
};
