const express = require('express');
const router = express.Router();
const platformController = require('../controllers/platform.controller');

router.get('/overview', (req, res) => platformController.getOverview(req, res));
router.get('/registry', (req, res) => platformController.getRegistry(req, res));
router.get('/modules', (req, res) => platformController.getModules(req, res));
router.get('/health', (req, res) => platformController.getHealth(req, res));
router.get('/integrations', (req, res) => platformController.getIntegrations(req, res));
router.get('/workflows', (req, res) => platformController.getWorkflows(req, res));

module.exports = router;
