/**
 * Cloud Backup Routes
 * NexoApps Platform - Phase 5C
 */

const express = require('express');
const router = express.Router();
const backupController = require('../controllers/backup.controller');
const { optionalAuthToken } = require('../middleware/auth.middleware');

router.get('/', optionalAuthToken, backupController.getBackups);
router.post('/create', optionalAuthToken, backupController.createBackup);
router.post('/restore', optionalAuthToken, backupController.restoreBackup);

module.exports = router;
