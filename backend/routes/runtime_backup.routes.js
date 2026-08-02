/**
 * Runtime Backup Routes — NexoApps Phase 8B
 */

const express = require('express');
const router = express.Router();
const { optionalAuthToken } = require('../middleware/auth.middleware');
const runtimeBackupController = require('../controllers/runtime_backup.controller');

router.get('/snapshots/:instanceId', optionalAuthToken, runtimeBackupController.listSnapshots);
router.post('/snapshots/:instanceId', optionalAuthToken, runtimeBackupController.createSnapshot);
router.get('/backups/:environmentId', optionalAuthToken, runtimeBackupController.listBackups);
router.post('/backups/:environmentId', optionalAuthToken, runtimeBackupController.createBackup);

module.exports = router;
