const express = require('express');
const router = express.Router();
const disasterRecoveryController = require('../controllers/disaster_recovery.controller');

router.get('/plans', (req, res) => disasterRecoveryController.getPlans(req, res));
router.get('/executions', (req, res) => disasterRecoveryController.getExecutions(req, res));
router.post('/trigger-drill', (req, res) => disasterRecoveryController.triggerDrill(req, res));

module.exports = router;
