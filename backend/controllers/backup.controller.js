/**
 * Cloud Backup Controller
 * NexoApps Platform - Phase 5C
 */

const backupService = require('../services/backup.service');

exports.getBackups = async (req, res, next) => {
  try {
    const backups = backupService.getBackups(req.user?.id);
    return res.status(200).json({
      success: true,
      data: backups,
    });
  } catch (err) {
    next(err);
  }
};

exports.createBackup = async (req, res, next) => {
  try {
    const { backupName } = req.body;
    const backup = backupService.createBackup(req.user?.id, backupName);
    return res.status(201).json({
      success: true,
      data: backup,
    });
  } catch (err) {
    next(err);
  }
};

exports.restoreBackup = async (req, res, next) => {
  try {
    const { backupId } = req.body;
    const result = backupService.restoreBackup(backupId);
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
