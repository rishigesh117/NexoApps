/**
 * Cloud Backup Routes
 * NexoApps Platform - Version 3.3 (Extended for Phase 7D)
 */

const express = require('express');
const router = express.Router();
const backupController = require('../controllers/backup.controller');
const { optionalAuthToken } = require('../middleware/auth.middleware');

router.get('/', optionalAuthToken, backupController.getBackups);
router.post('/create', optionalAuthToken, backupController.createBackup);
router.post('/restore', optionalAuthToken, backupController.restoreBackup);

// Phase 7D Extensions
router.get('/system', optionalAuthToken, backupController.listSystemBackups);
router.post('/system/trigger', optionalAuthToken, backupController.triggerBackup);
router.post('/system/:id/restore', optionalAuthToken, backupController.triggerRestore);
router.get('/system/restore-history', optionalAuthToken, backupController.listRestoreHistory);

module.exports = router;
