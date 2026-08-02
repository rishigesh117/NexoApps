/**
 * Cloud Backup Controller
 * NexoApps Platform - Phase 5C (Extended for Phase 7D)
 */

const backupService = require('../services/backup.service');
const backupEngineService = require('../services/backup_engine.service');
const restoreService = require('../services/restore.service');

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

// ─── Phase 7D Extensions ───

exports.listSystemBackups = async (req, res) => {
  try {
    const backups = await backupEngineService.listBackups(req.query.tenantId || 'default');
    res.json({ success: true, data: backups });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.triggerBackup = async (req, res) => {
  try {
    const backup = await backupEngineService.triggerBackup(req.body);
    res.status(201).json({ success: true, data: backup });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.triggerRestore = async (req, res) => {
  try {
    const restore = await restoreService.triggerRestore(req.params.id || req.body.backupId, req.user?.username || 'admin');
    res.json({ success: true, data: restore });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.listRestoreHistory = async (req, res) => {
  try {
    const history = await restoreService.listRestoreHistory();
    res.json({ success: true, data: history });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
