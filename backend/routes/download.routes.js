/**
 * Download Routes
 * NexoApps Platform
 */

const express = require('express');
const router = express.Router();
const downloadController = require('../controllers/download.controller');
const authenticateToken = require('../middleware/auth.middleware');

router.post('/apps/:slug/download', authenticateToken, downloadController.initiateDownload);
router.get('/history', authenticateToken, downloadController.getDownloadHistory);
router.get('/file/:token', downloadController.streamDownloadFile);
router.get('/:id', authenticateToken, downloadController.getDownloadById);

module.exports = router;
