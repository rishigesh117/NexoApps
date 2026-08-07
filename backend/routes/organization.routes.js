const express = require('express');
const router = express.Router();
const organizationController = require('../controllers/organization.controller');

router.get('/orgs', (req, res) => organizationController.getOrganizations(req, res));
router.get('/sessions', (req, res) => organizationController.getActiveSessions(req, res));

module.exports = router;
