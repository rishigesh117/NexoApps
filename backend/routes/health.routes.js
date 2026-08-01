/**
 * Health Check Routes
 * NexoApps Platform - Phase 4E
 */

const express = require('express');
const router = express.Router();
const monitoringService = require('../services/monitoring.service');

// GET /api/v1/health
router.get('/', (req, res) => {
  const health = monitoringService.getSystemHealth();
  return res.status(200).json(health);
});

module.exports = router;
