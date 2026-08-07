const express = require('express');
const router = express.Router();
const enterpriseController = require('../controllers/enterprise.controller');

router.get('/overview', (req, res) => enterpriseController.getOverview(req, res));
router.get('/modules', (req, res) => enterpriseController.getModules(req, res));
router.get('/services', (req, res) => enterpriseController.getServices(req, res));
router.get('/workflows', (req, res) => enterpriseController.getWorkflows(req, res));

module.exports = router;
