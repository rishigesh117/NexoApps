const express = require('express');
const router = express.Router();
const complianceController = require('../controllers/compliance.controller');

router.get('/frameworks', (req, res) => complianceController.getFrameworks(req, res));
router.get('/audit-logs', (req, res) => complianceController.getAuditLogs(req, res));

module.exports = router;
