/**
 * Session Routes
 * NexoApps Platform
 */

const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/session.controller');
const authenticateToken = require('../middleware/auth.middleware');

router.get('/active', authenticateToken, sessionController.getActiveSessions);
router.post('/logout-all', authenticateToken, sessionController.logoutAllDevices);

module.exports = router;
