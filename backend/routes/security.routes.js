const express = require('express');
const router = express.Router();
const securityController = require('../controllers/security.controller');

router.get('/siem-summary', (req, res) => securityController.getSiemSummary(req, res));
router.get('/threats', (req, res) => securityController.getThreats(req, res));
router.get('/vulnerabilities', (req, res) => securityController.getVulnerabilities(req, res));
router.get('/policies', (req, res) => securityController.getPolicies(req, res));

module.exports = router;
