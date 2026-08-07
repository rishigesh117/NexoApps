const express = require('express');
const router = express.Router();
const governanceController = require('../controllers/governance.controller');

router.get('/quality-rules', (req, res) => governanceController.getQualityRules(req, res));
router.get('/master-data', (req, res) => governanceController.getMasterData(req, res));
router.get('/lineage', (req, res) => governanceController.getLineage(req, res));

module.exports = router;
