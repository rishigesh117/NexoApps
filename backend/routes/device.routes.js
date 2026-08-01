/**
 * Device Management Routes
 * NexoApps Platform - Phase 5C
 */

const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/device.controller');
const { optionalAuthToken } = require('../middleware/auth.middleware');

router.get('/', optionalAuthToken, deviceController.getDevices);
router.delete('/:id', optionalAuthToken, deviceController.removeDevice);

module.exports = router;
