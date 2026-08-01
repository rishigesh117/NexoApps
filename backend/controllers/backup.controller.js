/**
 * Cloud Backup Controller
 * NexoApps Platform - Phase 5C
 */

const backupService = require('../services/backup.service');

exports.getBackups = async (req, res, next) => {
  try {
    const userId = req.user?.id || 'usr-1';
    const backups = backupService.getBackups(userId);
    return res.status(200).json({ success: true, data: backups });
  } catch (err) { next(err); }
};

exports.createBackup = async (req, res, next) => {
  try {
    const userId = req.user?.id || 'usr-1';
    const { name, includes } = req.body;
    const backup = backupService.createBackup(userId, name, includes);
    return res.status(201).json({ success: true, data: backup });
  } catch (err) { next(err); }
};

exports.restoreBackup = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = backupService.restoreBackup(id);
    return res.status(200).json({ success: true, data: result });
  } catch (err) { next(err); }
};
